import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost" | "ghost-dark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-emerald-bright to-emerald text-navy-deep shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_12px_24px_-10px_rgba(217,164,65,0.55)] hover:-translate-y-px hover:shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_16px_28px_-10px_rgba(217,164,65,0.7)]",
  secondary:
    "bg-navy-secondary text-offwhite border border-line hover:border-emerald/50 hover:-translate-y-px",
  ghost:
    "bg-transparent text-offwhite border border-white/15 hover:border-emerald/50 hover:bg-white/[0.03]",
  "ghost-dark":
    "bg-transparent text-white border border-white/20 hover:border-white/50 hover:bg-white/5",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  to?: string;
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  to,
  href,
  download,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-mono text-[13.5px] font-semibold tracking-[0.01em] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${variantClasses[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={base}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} download={download} className={base}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  );
}
