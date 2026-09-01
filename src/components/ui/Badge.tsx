import {
  STATUS_LABELS,
  STATUS_TONES,
  type DeliveryStatus,
} from "@/data/condominiums";

type BadgeStatus = DeliveryStatus;

interface BadgeProps {
  status: BadgeStatus;
  className?: string;
}

/**
 * Badge — indicador visual de status de produto.
 * Usado em cards de produto e fichas técnicas.
 */
export default function Badge({ status, className = "" }: BadgeProps) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_TONES[status]} ${className}`.trim()}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

export { STATUS_LABELS, STATUS_TONES };
export type { BadgeStatus };