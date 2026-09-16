import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { brand } from "../../config/brand";

type NavItem = { label: string; to: string; icon: ReactNode };

const iconProps = { viewBox: "0 0 24 24", fill: "none", className: "h-[18px] w-[18px]" };

const navItems: NavItem[] = [
  {
    label: "Overview",
    to: "/app",
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
    label: "Customers",
    to: "/app/customers",
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15.5 13.2c2.4.2 4 1.9 4 4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Devices",
    to: "/app/devices",
    icon: (
      <svg {...iconProps}>
        <rect x="6.5" y="3" width="11" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 18h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Payments",
    to: "/app/payments",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 14.2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const { shop, staff, signOut } = useAuth();
  const initials = (staff?.full_name ?? shop?.name ?? "LP")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-navy-deep">
      <aside className="hidden w-[220px] flex-shrink-0 flex-col gap-1 border-r border-line-dark bg-white p-4 md:flex">
        <NavLink to="/" className="mb-6 flex items-center gap-2.5 px-1">
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm border border-emerald/60 bg-emerald-soft">
            <svg viewBox="0 0 128 128" className="h-4 w-4">
              <path d="M46 59V48a18 18 0 0 1 36 0v11" fill="none" stroke={brand.colors.emeraldDeep} strokeWidth="7" strokeLinecap="round" />
              <rect x="35" y="59" width="58" height="44" rx="9" fill={brand.colors.emeraldDeep} />
              <circle cx="64" cy="80" r="6" fill={brand.colors.emeraldSoft} />
              <rect x="61" y="80" width="6" height="13" rx="3" fill={brand.colors.emeraldSoft} />
            </svg>
          </span>
          <span className="font-heading text-[15px] font-extrabold text-offwhite">LockPilot</span>
        </NavLink>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/app"}
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
          <input
            type="text"
            placeholder="Search anything…"
            className="w-full max-w-[280px] rounded-sm border border-line bg-navy-deep px-3 py-2 text-[13px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald"
          />
          <div className="flex flex-shrink-0 items-center gap-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-line text-slate">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M12 4a5 5 0 0 0-5 5v3.2l-1.4 2.8h12.8L17 12.2V9a5 5 0 0 0-5-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9.5 17.5a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald text-[12px] font-bold text-white">
                {initials}
              </span>
              <div className="hidden sm:block">
                <div className="text-[13px] font-semibold text-offwhite">
                  {shop?.name ?? "LockPilot"}
                </div>
                {staff?.full_name && <div className="text-[11.5px] text-slate">{staff.full_name}</div>}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
