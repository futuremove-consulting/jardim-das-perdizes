import { describe, it, expect } from "vitest";
import { parseLeadPayload, normalizeWhatsapp } from "./validation";

const validBase = {
  intent: "invest",
  timeline: "quarter",
  name: "Maria Silva",
  whatsapp: "(11) 98765-4321",
  bestTime: "morning",
  contactConsent: true,
  promoConsent: false,
  source: { page: "/para-investir/" },
};

describe("normalizeWhatsapp", () => {
  it("keeps digits only", () => {
    expect(normalizeWhatsapp("(11) 98765-4321")).toBe("11987654321");
    expect(normalizeWhatsapp("+55 11 99999-8888")).toBe("5511999998888");
  });
});

describe("parseLeadPayload", () => {
  it("accepts a valid payload and normalizes the whatsapp number to digits", () => {
    const result = parseLeadPayload(validBase);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.whatsapp).toBe("11987654321");
      expect(result.lead.source.page).toBe("/para-investir/");
      expect(result.lead.promoConsent).toBe(false);
      expect(result.lead.contactConsent).toBe(true);
    }
  });

  it("rejects when the required contact consent is missing", () => {
    const result = parseLeadPayload({ ...validBase, contactConsent: false });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.contactConsent).toBeTruthy();
  });

  it("rejects invalid name, whatsapp, intent, timeline and bestTime", () => {
    const result = parseLeadPayload({
      ...validBase,
      name: "A",
      whatsapp: "123",
      intent: "other",
      timeline: "someday",
      bestTime: "dawn",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      for (const key of ["name", "whatsapp", "intent", "timeline", "bestTime"] as const) {
        expect(result.errors[key]).toBeTruthy();
      }
    }
  });

  it("rejects non-object payloads", () => {
    expect(parseLeadPayload(null).ok).toBe(false);
    expect(parseLeadPayload("lead").ok).toBe(false);
    expect(parseLeadPayload(42).ok).toBe(false);
  });

  it("keeps optional segment/operation/interest and enriched source when valid", () => {
    const result = parseLeadPayload({
      ...validBase,
      segment: "resale",
      operation: "sell",
      interest: "Sequoia",
      source: {
        page: "/condominios/sequoia/",
        entity: "sequoia",
        filters: { dorms: "4", area: "121" },
        campaign: "guia-perdizes",
      },
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.segment).toBe("resale");
      expect(result.lead.operation).toBe("sell");
      expect(result.lead.interest).toBe("Sequoia");
      expect(result.lead.source.entity).toBe("sequoia");
      expect(result.lead.source.filters).toEqual({ dorms: "4", area: "121" });
      expect(result.lead.source.campaign).toBe("guia-perdizes");
    }
  });

  it("drops invalid optional fields instead of failing the whole lead", () => {
    const result = parseLeadPayload({
      ...validBase,
      segment: "flipping",
      source: { page: "/", filters: { dorms: 4 } },
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.lead.segment).toBeUndefined();
      expect(result.lead.source.filters).toBeUndefined();
    }
  });
});
