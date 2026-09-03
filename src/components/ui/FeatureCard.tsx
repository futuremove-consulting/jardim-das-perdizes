import Icon, { IconName } from "@/components/ui/Icon";

interface FeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ icon, title, description, className = "" }: FeatureCardProps) {
  return (
    <div className={`group rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:border-brand hover:shadow-md ${className}`}>
      <div className="mb-4 inline-flex rounded-xl bg-brand-soft p-3 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
        <Icon name={icon} size="lg" />
      </div>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
    </div>
  );
}
