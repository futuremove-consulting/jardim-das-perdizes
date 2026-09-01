import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-brand-contrast hover:opacity-90",
  secondary:
    "border border-line-strong text-ink hover:border-brand hover:text-brand",
  ghost: "text-ink hover:text-brand",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-focus-ring";

/**
 * Button — componente base de CTAs (ação).
 * Variantes: primary (preenchido), secondary (borda), ghost (texto).
 * Para links de navegação, usar <ButtonLink> ou <Link> diretamente.
 */
export default function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ButtonProps {
  href: string;
}

/**
 * ButtonLink — CTA que é um link de navegação.
 * Combina o visual do Button com o comportamento do <Link>.
 */
export function ButtonLink({
  children,
  variant = "primary",
  href,
  className = "",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {children}
    </Link>
  );
}