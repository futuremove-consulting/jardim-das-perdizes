"use server";

import { parseLeadPayload, type LeadFieldErrors } from "./validation";
import { BROKER } from "@/lib/config";

export interface SubmitLeadResult {
  ok: boolean;
  storage?: "demo" | "supabase" | "rejected";
  errors?: LeadFieldErrors;
}

const FRIENDLY_ERROR =
  "Não foi possível registrar sua solicitação agora. Tente novamente em instantes ou fale com o especialista pelo WhatsApp.";

/**
 * CONV-01 + CRM-01. Canonical storage is the Supabase `leads` table via REST
 * (server-side key only). Demo mode accepts without persisting; prod without
 * CRM configuration fails honestly instead of silently dropping the lead.
 */
export async function submitLeadAction(payload: unknown): Promise<SubmitLeadResult> {
  const parsed = parseLeadPayload(payload);
  if (!parsed.ok) return { ok: false, storage: "rejected", errors: parsed.errors };

  const appMode = process.env.APP_MODE ?? "demo";
  if (appMode !== "prod") return { ok: true, storage: "demo" };

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    return { ok: false, errors: { form: FRIENDLY_ERROR } };
  }

  const lead = parsed.lead;
  const body = {
    intent: lead.intent,
    timeline: lead.timeline,
    name: lead.name,
    whatsapp: lead.whatsapp,
    email: BROKER.email,
    best_time: lead.bestTime,
    segment: lead.segment ?? null,
    operation: lead.operation ?? null,
    interest: lead.interest ?? null,
    source_page: lead.source.page,
    entity: lead.source.entity ?? null,
    source_filters: lead.source.filters ?? null,
    source_campaign: lead.source.campaign ?? null,
    contact_consent: lead.contactConsent,
    promo_consent: lead.promoConsent,
  };

  try {
    const response = await fetch(`${supabaseUrl.replace(/\/+$/, "")}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return { ok: false, storage: "supabase", errors: { form: FRIENDLY_ERROR } };
    }
    return { ok: true, storage: "supabase" };
  } catch {
    return { ok: false, storage: "supabase", errors: { form: FRIENDLY_ERROR } };
  }
}