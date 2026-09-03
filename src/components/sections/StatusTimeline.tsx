import type { DeliveryStatus } from "@/data/condominiums";

interface StatusTimelineProps {
  status: DeliveryStatus;
  deliveryLabel: string;
  deliveryDate: string;
}

/**
 * Lifecycle stepper matching the reference sites (iApartamentos / apto.vc):
 * Breve lançamento → Lançamento → Em construção → Pronto para morar.
 * Horizontal and scrollable on mobile (overflow-x), full row on desktop.
 */
const STEPS: Array<{ id: DeliveryStatus | "launched"; label: string }> = [
  { id: "coming-soon", label: "Breve lançamento" },
  { id: "launched", label: "Lançamento" },
  { id: "under-construction", label: "Em construção" },
  { id: "ready-to-move", label: "Pronto para morar" },
];

const STATUS_INDEX: Record<DeliveryStatus, number> = {
  "coming-soon": 0,
  "under-construction": 2,
  "ready-to-move": 3,
  delivered: 3,
};

export default function StatusTimeline({
  status,
  deliveryLabel,
  deliveryDate,
}: StatusTimelineProps) {
  const current = STATUS_INDEX[status];

  return (
    <ol className="mt-8 flex overflow-x-auto pb-2 sm:overflow-visible">
      {STEPS.map((step, i) => {
        const state = i < current ? "done" : i === current ? "current" : "todo";
        const nodeClass =
          state === "todo"
            ? "bg-surface text-muted ring-1 ring-line"
            : "bg-brand text-brand-contrast" +
              (state === "current" ? " ring-4 ring-brand/20" : "");
        const lineClass = i < current ? "bg-brand" : i === current ? "bg-brand/40" : "bg-line";
        const labelClass =
          state === "current"
            ? "font-semibold text-ink"
            : state === "done"
              ? "text-ink"
              : "text-muted";

        return (
          <li key={step.id} className="min-w-[160px] sm:min-w-0 sm:flex-1">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
                  nodeClass
                }
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden="true"
                  className={"h-0.5 flex-1 rounded-full " + lineClass}
                />
              )}
            </div>
            <p className={"mt-2 pr-4 text-sm " + labelClass}>{step.label}</p>
            {state === "current" && (
              <p className="mt-0.5 pr-4 text-xs text-muted">
                {deliveryLabel}: {deliveryDate}
              </p>
            )}
          </li>
        );
      })}
    </ol>
  );
}
