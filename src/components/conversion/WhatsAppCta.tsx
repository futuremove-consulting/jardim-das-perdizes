"use client";

import { buildWhatsAppLink } from "@/lib/leads/whatsapp";
import type { LeadIntent } from "@/lib/leads/types";
import type { LeadFormSource } from "./source";

/**
 * CONV-01 door 2: "Falar agora com especialista". Renders nothing while the
 * WhatsApp number is unconfigured so pages degrade gracefully.
 */
export default function WhatsAppCta({
  intent,
  interest,
  source,
  className = "",
}: {
  intent?: LeadIntent;
  interest?: string;
  source?: LeadFormSource;
  className?: string;
}) {
  const href = buildWhatsAppLink({ intent, interest });
  if (!href) return null;

  void source;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ||
        "inline-flex rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-brand hover:text-brand"
      }
    >
      Falar agora com especialista
    </a>
  );
}