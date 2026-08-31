import { normalizeWhatsapp } from "./validation";
import type { LeadIntent } from "./types";

/**
 * Public wa.me number from env (digits with country code). Returns null when
 * unset or malformed so callers can hide the WhatsApp door gracefully.
 */
export function whatsappNumberFromEnv(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const digits = normalizeWhatsapp(raw);
  return /^\d{10,13}$/.test(digits) ? digits : null;
}

const WHATSAPP_MESSAGES: Record<LeadIntent, string> = {
  "buy-to-live":
    "Olá! Estou buscando um apartamento para morar no Jardim das Perdizes e gostaria de falar com um especialista.",
  invest:
    "Olá! Quero investir no Jardim das Perdizes (renda com locação ou revenda) e gostaria de falar com um especialista.",
  "sell-or-rent":
    "Olá! Sou proprietário no Jardim das Perdizes e quero vender ou alugar meu imóvel com um especialista.",
};

export interface WhatsAppLinkOptions {
  intent?: LeadIntent;
  interest?: string;
}

/** Door 2 of the conversion pair: pre-filled, intent-specific wa.me link. */
export function buildWhatsAppLink(options: WhatsAppLinkOptions = {}): string | null {
  const number = whatsappNumberFromEnv();
  if (!number) return null;

  const base = options.intent
    ? WHATSAPP_MESSAGES[options.intent]
    : "Olá! Quero falar com um especialista do Jardim das Perdizes.";
  const message = options.interest
    ? `${base} Tenho interesse no ${options.interest}.`
    : base;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}