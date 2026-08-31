"use client";

import { useState, type FormEvent } from "react";
import { submitLeadAction, type SubmitLeadResult } from "@/lib/leads/submitLead";
import type { LeadFieldErrors } from "@/lib/leads/types";
import type { LeadFormSource } from "./source";

const INTENT_OPTIONS = [
  { value: "buy-to-live", label: "Quero comprar para morar" },
  { value: "invest", label: "Quero investir" },
  { value: "sell-or-rent", label: "Sou proprietário" },
  { value: "rent-to-live", label: "Quero alugar para morar" },
] as const;

const SEGMENT_OPTIONS = [
  { value: "rental-income", label: "Renda com locação" },
  { value: "resale", label: "Revenda do imóvel" },
] as const;

const OPERATION_OPTIONS = [
  { value: "sell", label: "Vender" },
  { value: "rent", label: "Alugar" },
  { value: "both", label: "Vender e alugar" },
] as const;

const TIMELINE_OPTIONS = [
  { value: "now", label: "O quanto antes" },
  { value: "quarter", label: "Em até 3 meses" },
  { value: "semester", label: "De 3 a 6 meses" },
  { value: "year", label: "Neste ano" },
  { value: "browsing", label: "Ainda estou pesquisando" },
] as const;

const BEST_TIME_OPTIONS = [
  { value: "morning", label: "Manhã" },
  { value: "afternoon", label: "Tarde" },
  { value: "evening", label: "Noite" },
] as const;

const FIELD_CLASS =
  "mt-1 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none";

function RadioGroup({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: ReadonlyArray<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset aria-label={legend}>
      <legend className="text-sm font-medium text-ink">{legend}</legend>
      <div className="mt-2 grid gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm text-ink transition-colors hover:border-brand"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="accent-brand"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * CRM-01: leads arriving via anchors (e.g. /para-morar/ → /#conversao) keep
 * the real origin URL instead of the server-rendered page prop.
 */
function resolveOriginPage(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const { pathname, hash } = window.location;
  return hash ? `${pathname}${hash}` : pathname || fallback;
}

/**
 * CONV-01: the "Enviar solicitação" door. A 4-step qualifier mirroring the
 * persona tree (objetivo → estratégia/prazo → interesse → contato mínimo).
 * Validation is server-driven (LGPD: contact consent required, promo optional).
 */
export default function LeadForm({ source }: { source: LeadFormSource }) {
  const [step, setStep] = useState(1);
  const [intent, setIntent] = useState("");
  const [segment, setSegment] = useState("");
  const [operation, setOperation] = useState("");
  const [timeline, setTimeline] = useState("");
  const [interest, setInterest] = useState("");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [promoConsent, setPromoConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resultErrors, setResultErrors] = useState<LeadFieldErrors>({});
  const [success, setSuccess] = useState<SubmitLeadResult | null>(null);

  const canAdvanceFromStep2 =
    timeline.length > 0 &&
    (intent !== "invest" || segment.length > 0) &&
    (intent !== "sell-or-rent" || operation.length > 0);

  const errorMessages = Object.values(resultErrors).filter(Boolean);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const outcome = await submitLeadAction({
        intent,
        segment: intent === "invest" && segment ? segment : undefined,
        operation: intent === "sell-or-rent" && operation ? operation : undefined,
        timeline,
        interest: interest.trim() ? interest.trim() : undefined,
        name: name.trim(),
        whatsapp: whatsapp.trim(),
        bestTime,
        contactConsent,
        promoConsent,
        source: { ...source, page: resolveOriginPage(source.page) },
      });
      if (outcome.ok) {
        setSuccess(outcome);
      } else {
        setResultErrors(outcome.errors ?? { form: "Erro inesperado." });
      }
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setStep(1);
    setIntent("");
    setSegment("");
    setOperation("");
    setTimeline("");
    setInterest("");
    setName("");
    setWhatsapp("");
    setBestTime("");
    setContactConsent(false);
    setPromoConsent(false);
    setResultErrors({});
    setSuccess(null);
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-line bg-paper p-8 text-center">
        <h3 className="text-xl font-semibold text-ink">Solicitação recebida</h3>
        <p className="mt-2 text-sm text-ink-soft">
          Nosso especialista entrará em contato pelo WhatsApp no horário
          indicado: {BEST_TIME_OPTIONS.find((o) => o.value === bestTime)?.label}.
        </p>
        {success.storage === "demo" && (
          <p className="mt-4 rounded-xl border border-line px-4 py-3 text-xs text-muted">
            Modo demonstração: a solicitação foi validada, mas não foi registrada
            em CRM nesta instância.
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-brand hover:text-brand"
        >
          Nova solicitação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
      <p aria-live="polite" className="text-xs font-medium uppercase tracking-wide text-muted">
        Etapa {step} de 4
      </p>

      {errorMessages.length > 0 && (
        <div role="alert" className="mt-4 rounded-xl border border-error/30 bg-error/10 px-4 py-3">
          <ul className="list-disc space-y-1 pl-5 text-sm text-error">
            {errorMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {step === 1 && (
        <div className="mt-4">
          <RadioGroup
            legend="Qual é o seu objetivo?"
            name="intent"
            options={INTENT_OPTIONS}
            value={intent}
            onChange={setIntent}
          />
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={intent.length === 0}
              onClick={() => setStep(2)}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-contrast hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Avançar
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-4 space-y-6">
          <RadioGroup
            legend="Quando pretende decidir?"
            name="timeline"
            options={TIMELINE_OPTIONS}
            value={timeline}
            onChange={setTimeline}
          />
          {intent === "invest" && (
            <RadioGroup
              legend="Qual estratégia de investimento?"
              name="segment"
              options={SEGMENT_OPTIONS}
              value={segment}
              onChange={setSegment}
            />
          )}
          {intent === "sell-or-rent" && (
            <RadioGroup
              legend="O que deseja fazer com o imóvel?"
              name="operation"
              options={OPERATION_OPTIONS}
              value={operation}
              onChange={setOperation}
            />
          )}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              Voltar
            </button>
            <button
              type="button"
              disabled={!canAdvanceFromStep2}
              onClick={() => setStep(3)}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-contrast hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Avançar
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-4">
          <label htmlFor="interest" className="text-sm font-medium text-ink">
            O que procura? (opcional)
          </label>
          <textarea
            id="interest"
            rows={3}
            maxLength={120}
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            placeholder="Ex.: 3 dormitórios com vista para o parque"
            className={FIELD_CLASS}
          />
          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-contrast hover:opacity-90"
            >
              Avançar
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="mt-4 space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-ink">
              Seu nome
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={FIELD_CLASS}
            />
          </div>
          <div>
            <label htmlFor="whatsapp" className="text-sm font-medium text-ink">
              WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              required
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              placeholder="(11) 98765-4321"
              className={FIELD_CLASS}
            />
          </div>
          <RadioGroup
            legend="Melhor horário para contato"
            name="bestTime"
            options={BEST_TIME_OPTIONS}
            value={bestTime}
            onChange={setBestTime}
          />
          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={contactConsent}
              onChange={(event) => setContactConsent(event.target.checked)}
              className="mt-1 accent-brand"
            />
            Autorizo o contato por WhatsApp para retornar esta solicitação.
          </label>
          <label className="flex items-start gap-3 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={promoConsent}
              onChange={(event) => setPromoConsent(event.target.checked)}
              className="mt-1 accent-brand"
            />
            Quero receber novidades e análises do mercado (opcional, separado do
            contato).
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink hover:border-brand hover:text-brand"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-contrast hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Enviando…" : "Enviar solicitação"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
