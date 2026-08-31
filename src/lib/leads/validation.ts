import {
  LEAD_BEST_TIMES,
  LEAD_INTENTS,
  LEAD_OPERATIONS,
  LEAD_SEGMENTS,
  LEAD_TIMELINES,
  type LeadBestTime,
  type LeadFieldErrors,
  type LeadIntent,
  type LeadOperation,
  type LeadPayload,
  type LeadSegment,
  type LeadSource,
  type LeadTimeline,
} from "./types";

export {
  LEAD_BEST_TIMES,
  LEAD_INTENTS,
  LEAD_OPERATIONS,
  LEAD_SEGMENTS,
  LEAD_TIMELINES,
};
export type {
  LeadBestTime,
  LeadFieldErrors,
  LeadIntent,
  LeadOperation,
  LeadPayload,
  LeadSegment,
  LeadSource,
  LeadTimeline,
};

export type ParseLeadResult =
  | { ok: true; lead: LeadPayload }
  | { ok: false; errors: LeadFieldErrors };

/** Strips everything that is not a digit (DDI + DDD + number). */
export function normalizeWhatsapp(input: string): string {
  return input.replace(/\D+/g, "");
}

/** BR numbers: 10–11 digits (DDD + phone) optionally prefixed by 55. */
export function isValidWhatsapp(digits: string): boolean {
  return /^(\d{10,11}|55\d{10,11})$/.test(digits);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

function isEnum<T extends readonly string[]>(
  value: unknown,
  allowed: T
): value is T[number] {
  return typeof value === "string" && (allowed as readonly string[]).includes(value);
}

function parseSource(value: unknown): LeadSource | undefined {
  if (!isRecord(value)) return undefined;
  const page = asString(value.page);
  if (!page || page.trim().length === 0) return undefined;

  const source: LeadSource = { page };
  const entity = asString(value.entity);
  if (entity && entity.trim().length > 0) source.entity = entity;

  // Filters are a flat string→string map; anything else is dropped silently.
  if (isRecord(value.filters)) {
    const filters: Record<string, string> = {};
    for (const [key, filterValue] of Object.entries(value.filters)) {
      if (typeof filterValue === "string") filters[key] = filterValue;
    }
    if (Object.keys(filters).length > 0) source.filters = filters;
  }

  const campaign = asString(value.campaign);
  if (campaign && campaign.trim().length > 0) source.campaign = campaign;

  return source;
}

/**
 * Server-side validation with LGPD-by-design rules: contact requires explicit
 * consent; optional marketing consent is separate; unknown/invalid optional
 * fields are dropped instead of failing the whole lead.
 */
export function parseLeadPayload(payload: unknown): ParseLeadResult {
  if (!isRecord(payload)) return { ok: false, errors: {} };

  const errors: LeadFieldErrors = {};
  const lead: LeadPayload = {
    intent: "buy-to-live",
    timeline: "quarter",
    name: "",
    whatsapp: "",
    bestTime: "morning",
    contactConsent: true,
    promoConsent: false,
    source: { page: "/" },
  };

  if (isEnum(payload.intent, LEAD_INTENTS)) lead.intent = payload.intent;
  else errors.intent = "Selecione o seu objetivo.";

  if (isEnum(payload.timeline, LEAD_TIMELINES)) lead.timeline = payload.timeline;
  else errors.timeline = "Informe quando pretende decidir.";

  const name = asString(payload.name)?.trim() ?? "";
  if (name.length >= 2 && name.length <= 120) lead.name = name;
  else errors.name = "Informe seu nome completo.";

  const whatsappDigits = normalizeWhatsapp(asString(payload.whatsapp) ?? "");
  if (isValidWhatsapp(whatsappDigits)) lead.whatsapp = whatsappDigits;
  else errors.whatsapp = "Informe um WhatsApp válido com DDD.";

  if (isEnum(payload.bestTime, LEAD_BEST_TIMES)) lead.bestTime = payload.bestTime;
  else errors.bestTime = "Informe o melhor horário para contato.";

  if (payload.contactConsent !== true) {
    errors.contactConsent =
      "Precisamos da sua autorização para entrar em contato por WhatsApp.";
  } else {
    lead.contactConsent = true;
  }
  lead.promoConsent = payload.promoConsent === true;

  const source = parseSource(payload.source);
  if (source) lead.source = source;
  else errors.source = "Origem da solicitação inválida.";

  // Optional qualifiers: kept when valid, dropped otherwise.
  if (isEnum(payload.segment, LEAD_SEGMENTS)) lead.segment = payload.segment;
  if (isEnum(payload.operation, LEAD_OPERATIONS)) lead.operation = payload.operation;

  const interest = asString(payload.interest)?.trim();
  if (interest && interest.length <= 120) lead.interest = interest;

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, lead };
}