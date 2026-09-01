interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  elevated?: boolean;
  className?: string;
}

/**
 * Card — container de conteúdo com borda e cantos arredondados.
 * - interactive: hover com borda brand (para links)
 * - elevated: fundo paper-secondary (para destaque)
 */
export default function Card({
  children,
  interactive = false,
  elevated = false,
  className = "",
}: CardProps) {
  const base = "rounded-2xl border border-line p-6";
  const interactiveClass = interactive
    ? "transition-colors hover:border-brand cursor-pointer"
    : "";
  const elevatedClass = elevated ? "bg-paper-secondary" : "";

  return (
    <div className={`${base} ${interactiveClass} ${elevatedClass} ${className}`.trim()}>
      {children}
    </div>
  );
}