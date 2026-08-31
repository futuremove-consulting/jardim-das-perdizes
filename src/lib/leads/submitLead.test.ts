import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { submitLeadAction } from "./submitLead";

const validPayload = {
  intent: "buy-to-live",
  timeline: "now",
  name: "João Souza",
  whatsapp: "11987654321",
  bestTime: "evening",
  contactConsent: true,
  promoConsent: true,
  source: { page: "/", entity: "sequoia" },
};

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  mockFetch.mockReset();
});

function stubProdCrm() {
  vi.stubEnv("APP_MODE", "prod");
  vi.stubEnv("SUPABASE_URL", "https://sup.test");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "sk-test");
}

describe("submitLeadAction", () => {
  it("rejects invalid payloads without any network call", async () => {
    stubProdCrm();
    const result = await submitLeadAction({ name: "x" });
    expect(result.ok).toBe(false);
    expect(result.storage).toBe("rejected");
    expect(result.errors?.name).toBeTruthy();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("accepts and does not persist in demo mode", async () => {
    vi.stubEnv("APP_MODE", "demo");
    const result = await submitLeadAction(validPayload);
    expect(result).toEqual({ ok: true, storage: "demo" });
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("persists to the Supabase REST endpoint in prod with server-side auth", async () => {
    stubProdCrm();
    mockFetch.mockResolvedValue({ ok: true, status: 201 });
    const result = await submitLeadAction(validPayload);
    expect(result).toEqual({ ok: true, storage: "supabase" });

    const [url, init] = mockFetch.mock.calls[0];
    expect(url).toBe("https://sup.test/rest/v1/leads");
    expect(init.method).toBe("POST");
    expect(init.headers.apikey).toBe("sk-test");
    expect(init.headers.Authorization).toBe("Bearer sk-test");
    expect(init.headers.Prefer).toBe("return=minimal");

    const body = JSON.parse(init.body);
    expect(body.intent).toBe("buy-to-live");
    expect(body.whatsapp).toBe("11987654321");
    expect(body.best_time).toBe("evening");
    expect(body.source_page).toBe("/");
    expect(body.entity).toBe("sequoia");
    expect(body.contact_consent).toBe(true);
    expect(body.promo_consent).toBe(true);
  });

  it("fails honestly in prod when the CRM is not configured", async () => {
    vi.stubEnv("APP_MODE", "prod");
    const result = await submitLeadAction(validPayload);
    expect(result.ok).toBe(false);
    expect(result.errors?.form).toBeTruthy();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("surfaces a friendly error when Supabase rejects the insert", async () => {
    stubProdCrm();
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    const result = await submitLeadAction(validPayload);
    expect(result.ok).toBe(false);
    expect(result.storage).toBe("supabase");
    expect(result.errors?.form).toBeTruthy();
  });

  it("surfaces a friendly error when the network fails", async () => {
    stubProdCrm();
    mockFetch.mockRejectedValue(new Error("offline"));
    const result = await submitLeadAction(validPayload);
    expect(result.ok).toBe(false);
    expect(result.storage).toBe("supabase");
    expect(result.errors?.form).toBeTruthy();
  });
});
