interface TableRow {
  label: string;
  value: string;
  highlight?: boolean;
}

interface SectionTableProps {
  caption: string;
  rows: TableRow[];
  className?: string;
}

export default function SectionTable({ caption, rows, className = "" }: SectionTableProps) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-paper ${className}`}>
      <table className="w-full text-sm">
        <caption className="border-b border-line bg-paper-secondary px-4 py-3 text-left font-semibold text-ink">
          {caption}
        </caption>
        <tbody className="divide-y divide-line">
          {rows.map((row, i) => (
            <tr key={i} className={row.highlight ? "bg-brand-soft/30" : ""}>
              <th className="px-4 py-3 text-left font-medium text-ink-soft">{row.label}</th>
              <td className="px-4 py-3 text-right font-semibold text-ink">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
