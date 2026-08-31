import { describe, it, expect, afterEach, vi } from "vitest";
import { buildWhatsAppLink, whatsappNumberFromEnv } from "./whatsapp";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("whatsappNumberFromEnv", () => {
  it("returns null when unconfigured", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "");
    expect(whatsappNumberFromEnv()).toBeNull();
  });

  it("returns digits only when configured with a formatted number", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "55 11 99999-8888");
    expect(whatsappNumberFromEnv()).toBe("5511999998888");
  });

  it("rejects malformed configured numbers", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "abc");
    expect(whatsappNumberFromEnv()).toBeNull();
  });
});

describe("buildWhatsAppLink", () => {
  it("returns null when the number is not configured", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "");
    expect(buildWhatsAppLink({})).toBeNull();
  });

  it("builds a wa.me link with an intent-specific pre-filled message", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "55 11 99999-8888");
    const link = buildWhatsAppLink({ intent: "sell-or-rent" });
    expect(link).toMatch(/^https:\/\/wa\.me\/5511999998888\?text=/);
    expect(decodeURIComponent(link!.split("text=")[1])).toMatch(/propriet/i);
  });

  it("includes the interest when provided", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "5511999998888");
    const link = buildWhatsAppLink({ interest: "Sequoia" });
    expect(decodeURIComponent(link!.split("text=")[1])).toContain("Sequoia");
  });

  it("falls back to a generic specialist message without intent", () => {
    vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", "5511999998888");
    const link = buildWhatsAppLink({});
    expect(decodeURIComponent(link!.split("text=")[1])).toMatch(/especialista/i);
  });
});
