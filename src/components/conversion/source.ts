/** CRM-01 origin context passed from server pages to the conversion form. */
export interface LeadFormSource {
  page: string;
  entity?: string;
  filters?: Record<string, string>;
  campaign?: string;
}