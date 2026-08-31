import type { FaqItem } from "@/lib/seo/schemas";

/**
 * Visible FAQ block. The SAME items array must be passed to faqPageSchema()
 * for JSON-LD — answers here and in schema are always 1:1 (no hidden data).
 */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <section className="mt-12 max-w-2xl" aria-label="Perguntas frequentes">
      <h2 className="text-xl font-semibold">Perguntas frequentes</h2>
      <dl className="mt-4 space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-medium text-ink">{item.question}</dt>
            <dd className="mt-1 leading-7 text-ink-soft">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}