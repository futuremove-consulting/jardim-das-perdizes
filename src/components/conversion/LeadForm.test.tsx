import { describe, it, expect, afterEach, vi } from "vitest";
import { cleanup, render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeadForm from "./LeadForm";
import { submitLeadAction } from "@/lib/leads/submitLead";

vi.mock("@/lib/leads/submitLead", () => ({ submitLeadAction: vi.fn() }));

const mockAction = submitLeadAction as unknown as ReturnType<typeof vi.fn>;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function advance() {
  fireEvent.click(screen.getByRole("button", { name: /avançar/i }));
}

function completeToStep4() {
  render(<LeadForm source={{ page: "/" }} />);
  fireEvent.click(screen.getByRole("radio", { name: /quero investir/i }));
  advance();
  fireEvent.click(screen.getByRole("radio", { name: /renda com locação/i }));
  fireEvent.click(screen.getByRole("radio", { name: /em até 3 meses/i }));
  advance();
  advance();
}

describe("LeadForm", () => {
  it("renders step 1 with the four intents and a progress indicator", () => {
    render(<LeadForm source={{ page: "/" }} />);
    expect(screen.getByText(/etapa 1 de 4/i)).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /qual é o seu objetivo/i })
    ).toBeInTheDocument();
    for (const label of [
      /quero comprar para morar/i,
      /quero investir/i,
      /sou proprietário/i,
    ]) {
      expect(screen.getByRole("radio", { name: label })).toBeInTheDocument();
    }
  });

  it("blocks advancing until an intent is selected", () => {
    render(<LeadForm source={{ page: "/" }} />);
    expect(screen.getByRole("button", { name: /avançar/i })).toBeDisabled();
    fireEvent.click(screen.getByRole("radio", { name: /quero comprar para morar/i }));
    expect(screen.getByRole("button", { name: /avançar/i })).toBeEnabled();
  });

  it("goes back without losing the selection", () => {
    render(<LeadForm source={{ page: "/" }} />);
    fireEvent.click(screen.getByRole("radio", { name: /quero investir/i }));
    advance();
    expect(screen.getByText(/etapa 2 de 4/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));
    expect(screen.getByText(/etapa 1 de 4/i)).toBeInTheDocument();
    expect(
      (
        screen.getByRole("radio", { name: /quero investir/i }) as HTMLInputElement
      ).checked
    ).toBe(true);
  });

  it("asks the investment strategy only for the invest intent", () => {
    render(<LeadForm source={{ page: "/" }} />);
    fireEvent.click(screen.getByRole("radio", { name: /quero comprar para morar/i }));
    advance();
    expect(
      screen.queryByRole("group", { name: /qual estratégia/i })
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /voltar/i }));
    fireEvent.click(screen.getByRole("radio", { name: /quero investir/i }));
    advance();
    expect(
      screen.getByRole("group", { name: /qual estratégia/i })
    ).toBeInTheDocument();
  });

  it("completes the 4 steps and shows the success confirmation", async () => {
    mockAction.mockResolvedValueOnce({ ok: true, storage: "demo" });
    completeToStep4();

    fireEvent.change(screen.getByLabelText(/seu nome/i), {
      target: { value: "Maria Silva" },
    });
    fireEvent.change(screen.getByLabelText("WhatsApp"), {
      target: { value: "(11) 98765-4321" },
    });
    fireEvent.click(screen.getByRole("radio", { name: /manhã/i }));
    fireEvent.click(
      screen.getByRole("checkbox", { name: /autorizo o contato/i })
    );
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitação/i }));

    await waitFor(() =>
      expect(screen.getByText(/solicitação recebida/i)).toBeInTheDocument()
    );
    expect(mockAction).toHaveBeenCalledTimes(1);
    const payload = mockAction.mock.calls[0][0];
    expect(payload.intent).toBe("invest");
    expect(payload.segment).toBe("rental-income");
    expect(payload.timeline).toBe("quarter");
    expect(payload.promoConsent).toBe(false);
    expect(payload.source.page).toBe("/");
    expect(payload.whatsapp).toBe("(11) 98765-4321");
  });

  it("captures the real origin URL (pathname + hash) instead of the page prop", async () => {
    window.history.replaceState(null, "", "/para-morar/#conversao");
    mockAction.mockResolvedValueOnce({ ok: true, storage: "demo" });
    completeToStep4();
    fireEvent.change(screen.getByLabelText(/seu nome/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("WhatsApp"), { target: { value: "11987654321" } });
    fireEvent.click(screen.getByRole("radio", { name: /tarde/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /autorizo o contato/i }));
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitação/i }));

    await waitFor(() => expect(mockAction).toHaveBeenCalledTimes(1));
    expect(mockAction.mock.calls[0][0].source.page).toBe("/para-morar/#conversao");
    window.history.replaceState(null, "", "/");
  });

  it("shows the demo-mode note after a successful demo submission", async () => {
    mockAction.mockResolvedValueOnce({ ok: true, storage: "demo" });
    completeToStep4();
    fireEvent.change(screen.getByLabelText(/seu nome/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("WhatsApp"), { target: { value: "11987654321" } });
    fireEvent.click(screen.getByRole("radio", { name: /tarde/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /autorizo o contato/i }));
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitação/i }));

    await waitFor(() =>
      expect(screen.getByText(/modo demonstração/i)).toBeInTheDocument()
    );
  });

  it("shows field errors and stays on step 4 when the action rejects", async () => {
    mockAction.mockResolvedValueOnce({
      ok: false,
      storage: "rejected",
      errors: { whatsapp: "Informe um WhatsApp válido com DDD." },
    });
    completeToStep4();
    fireEvent.change(screen.getByLabelText(/seu nome/i), { target: { value: "Ana" } });
    fireEvent.change(screen.getByLabelText("WhatsApp"), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("radio", { name: /tarde/i }));
    fireEvent.click(screen.getByRole("checkbox", { name: /autorizo o contato/i }));
    fireEvent.click(screen.getByRole("button", { name: /enviar solicitação/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(/whatsapp/i)
    );
    expect(screen.getByText(/etapa 4 de 4/i)).toBeInTheDocument();
  });
});
