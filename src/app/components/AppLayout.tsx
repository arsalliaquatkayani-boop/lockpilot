import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";
import { brand } from "../../config/brand";

export function AppLayout({ children }: { children: ReactNode }) {
  const { shop, staff, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-navy-deep">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-sm border border-emerald/60 bg-navy-secondary">
              <svg viewBox="0 0 128 128" className="h-[18px] w-[18px]">
                <path d="M46 59V48a18 18 0 0 1 36 0v11" fill="none" stroke={brand.colors.offwhite} strokeWidth="7" strokeLinecap="round" />
                <rect x="35" y="59" width="58" height="44" rx="9" fill={brand.colors.offwhite} />
                <circle cx="64" cy="80" r="6" fill={brand.colors.emerald} />
                <rect x="61" y="80" width="6" height="13" rx="3" fill={brand.colors.emerald} />
              </svg>
            </span>
            <div>
              <div className="font-heading text-[15px] font-extrabold text-offwhite">
                {shop?.name ?? "LockPilot"}
              </div>
              {staff?.full_name && (
                <div className="font-mono text-[11.5px] text-slate">{staff.full_name}</div>
              )}
            </div>
          </div>
          <Button variant="ghost-dark" size="sm" onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-6 py-8">{children}</main>
    </div>
  );
}
