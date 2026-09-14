import type { ReactNode } from "react";
import { useAuth } from "../../context/AuthContext";

export function AppLayout({ children }: { children: ReactNode }) {
  const { shop, staff, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-navy">
      <header className="border-b border-line-dark">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <div>
            <div className="text-[15px] font-semibold text-white">
              {shop?.name ?? "LockPilot"}
            </div>
            {staff?.full_name && (
              <div className="text-[12.5px] text-slate-light">{staff.full_name}</div>
            )}
          </div>
          <button
            onClick={() => signOut()}
            className="rounded-sm border border-white/25 px-4 py-2 text-[13.5px] text-white transition-colors hover:border-white/60"
          >
            Sign out
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-6 py-8">{children}</main>
    </div>
  );
}
