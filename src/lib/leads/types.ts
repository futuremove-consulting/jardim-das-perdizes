export const LEAD_INTENTS = [
  "buy-to-live",
  "invest",
  "sell-or-rent",
] as const;
export type LeadIntent = (typeof LEAD_INTENTS)[number];

export const LEAD_TIMELINES = [
  "now",
  "quarter",
  "semester",
  "year",
  "browsing",
] as const;
export type LeadTimeline = (typeof LEAD_TIMELINES)[number];

export const LEAD_BEST_TIMES = ["morning", "afternoon", "evening"] as const;
export type LeadBestTime = (typeof LEAD_BEST_TIMES)[number];

export const LEAD_SEGMENTS = ["rental-income", "resale"] as const;
export type LeadSegment = (typeof LEAD_SEGMENTS)[number];

export const LEAD_OPERATIONS = ["sell", "rent", "both"] as const;
export type LeadOperation = (typeof LEAD_OPERATIONS)[number];

/** CRM-01: origin, entity, filters and campaign captured without PII. */
export interface LeadSource {
  page: string;
  entity?: string;
  filters?: Record<string, string>;
  campaign?: string;
}

export interface LeadPayload {
  intent: LeadIntent;
  timeline: LeadTimeline;
  name: string;
  whatsapp: string;
  bestTime: LeadBestTime;
  contactConsent: true;
  promoConsent: boolean;
  source: LeadSource;
  segment?: LeadSegment;
  operation?: LeadOperation;
  interest?: string;
}

export type LeadFieldErrors = Partial<
  Record<
    | "intent"
    | "timeline"
    | "name"
    | "whatsapp"
    | "bestTime"
    | "contactConsent"
    | "source"
    | "form",
    string
  >
>;