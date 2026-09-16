import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost" | "ghost-dark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-emerald text-white shadow-[0_8px_20px_rgba(33,116,255,0.22)] hover:bg-emerald-deep hover:-translate-y-px",
  secondary:
    "bg-navy-secondary text-offwhite border border-line hover:border-emerald/50 hover:-translate-y-px",
  ghost:
    "bg-transparent text-offwhite border border-line hover:border-emerald/50 hover:bg-emerald-soft/40",
  "ghost-dark":
    "bg-transparent text-offwhite border border-line hover:border-slate-light hover:bg-navy",
};

type Size = "md" | "sm";

const sizeClasses: Record<Size, string> = {
  md: "px-6 py-3 text-[14.5px]",
  sm: "px-3.5 py-1.5 text-[12.5px]",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  to?: string;
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  download,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${sizeClasses[size]} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${variantClasses[variant]} ${className}`;

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
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
