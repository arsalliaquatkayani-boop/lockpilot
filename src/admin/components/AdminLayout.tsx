import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type NavItem = { label: string; to: string; icon: ReactNode };

const iconProps = { viewBox: "0 0 24 24", fill: "none", className: "h-[18px] w-[18px]" };

const navItems: NavItem[] = [
  {
    label: "Overview",
    to: "/admin",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Shops",
    to: "/admin/shops",
    icon: (
      <svg {...iconProps}>
        <path d="M4 9.5 5.5 4h13L20 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4.5 9.5V19a1 1 0 0 0 1 1H18.5a1 1 0 0 0 1-1V9.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 20v-5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V20" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen bg-navy-deep">
      <aside className="hidden w-[220px] flex-shrink-0 flex-col gap-1 border-r border-line-dark bg-white p-4 md:flex">
        <NavLink to="/" className="mb-1 flex items-center gap-2.5 px-1">
          <img src="/lockpilot-mark-square.png" alt="" className="h-9 w-9 flex-shrink-0" />
          <span className="font-heading text-[15px] font-extrabold text-offwhite">LockPilot</span>
        </NavLink>
        <div className="mb-5 px-1 font-mono text-[11px] uppercase tracking-wide text-slate">
          Master admin
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-[13.5px] font-medium transition-colors ${
                isActive ? "bg-emerald-soft text-emerald-deep" : "text-slate hover:bg-navy hover:text-offwhite"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={() => signOut()}
          className="mt-auto flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-left text-[13.5px] font-medium text-slate hover:bg-navy hover:text-offwhite"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
            <path d="M9 6l-5.5 6L9 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.5 12H16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M13 3.5h4.5a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Sign out
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-line-dark bg-white px-6 py-3.5">
          <span className="text-[13px] font-semibold text-offwhite">LockPilot HQ</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald text-[12px] font-bold text-white">
            LP
          </span>
        </header>

        <main className="flex-1 overflow-x-hidden px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
