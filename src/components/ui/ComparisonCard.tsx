import Icon, { IconName } from "@/components/ui/Icon";

interface ComparisonItem {
  icon: IconName;
  label: string;
  value: string;
}

interface ComparisonCardProps {
  title: string;
  subtitle?: string;
  items: ComparisonItem[];
  highlight?: boolean;
  className?: string;
}

export default function ComparisonCard({ title, subtitle, items, highlight = false, className = "" }: ComparisonCardProps) {
  return (
    <article className={`rounded-2xl border border-line bg-surface p-6 shadow-sm transition-shadow hover:shadow-md ${highlight ? "border-brand ring-2 ring-brand/20" : ""} ${className}`}>
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
      </header>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <Icon name={item.icon} size="sm" className={highlight ? "text-brand" : "text-muted"} />
            <span className="flex-1 text-sm text-ink-soft">{item.label}</span>
            <span className="text-sm font-semibold text-ink">{item.value}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
