/**
 * "Key Takeaways" block — the first extraction surface for AI answers and
 * featured snippets (AEO/GEO pattern: 3–4 factual bullets right under the H1).
 */
export default function KeyTakeaways({
  items,
}: {
  items: string[];
}) {
  return (
    <section
      className="mt-8 max-w-2xl rounded-2xl border border-line bg-paper-secondary p-6"
      aria-label="Resumo rápido"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
        Resumo rápido
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}