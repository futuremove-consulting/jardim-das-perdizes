interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

/** Consistent section header used across the product pages (style guide: eyebrow + title). */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div id={id} className="mx-auto mt-14 max-w-3xl scroll-mt-28 sm:mt-16">
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          {description}
        </p>
      )}
    </div>
  );
}
