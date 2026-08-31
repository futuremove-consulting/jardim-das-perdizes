/**
 * JSON-LD emitter. Serializes at render time (never string-interpolated into
 * the script tag — threat T-04-01). Server-component safe.
 */
export default function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}