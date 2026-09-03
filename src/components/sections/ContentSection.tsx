import { ReactNode } from "react";

interface ContentSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ContentSection({ id, eyebrow, title, children, className = "" }: ContentSectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-3xl px-4 text-center">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <div className="mt-6 space-y-6 text-base leading-relaxed text-ink-soft">
          {children}
        </div>
      </div>
    </section>
  );
}
