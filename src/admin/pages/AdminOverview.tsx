import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/Button";
import { useAdminShops } from "../lib/useAdminShops";

function StatCard({ label, value, tone }: { label: string; value: string; tone?: "warning" | "danger" }) {
  const toneClass = tone === "warning" ? "text-warning" : tone === "danger" ? "text-danger" : "text-offwhite";
  return (
    <div className="rounded-card border border-line-dark p-4">
      <div className="mb-1.5 text-[12px] text-slate">{label}</div>
      <div className={`font-heading text-[22px] font-extrabold tabular-nums ${toneClass}`}>{value}</div>
    </div>
  );
}

const billingStyle: Record<string, string> = {
  active: "bg-success-soft text-success",
  overdue: "bg-warning-soft text-warning",
  suspended: "bg-danger-soft text-danger",
};

export function AdminOverview() {
  const { shops, loading, error } = useAdminShops();

  const stats = useMemo(() => {
    return {
      total: shops.length,
      trial: shops.filter((s) => s.plan === "trial").length,
      overdue: shops.filter((s) => s.billing_status === "overdue").length,
      suspended: shops.filter((s) => s.billing_status === "suspended").length,
    };
  }, [shops]);

  const recentShops = shops.slice(0, 6);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-[13.5px] text-slate">Loading shops…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {error && (
        <div className="mb-6 rounded-sm border border-danger/40 bg-danger-soft px-4 py-3 text-[13.5px] text-danger">
          {error}
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-[24px] font-extrabold text-offwhite">LockPilot HQ</h1>
        <Button to="/admin/shops/new" variant="primary" size="sm">
          + Add shop
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total shops" value={String(stats.total)} />
        <StatCard label="On trial" value={String(stats.trial)} />
        <StatCard label="Payment overdue" value={String(stats.overdue)} tone={stats.overdue > 0 ? "warning" : undefined} />
        <StatCard label="Suspended" value={String(stats.suspended)} tone={stats.suspended > 0 ? "danger" : undefined} />
      </div>

      <div className="rounded-card border border-line-dark p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-[14.5px] font-bold text-offwhite">Recently added shops</h2>
          <Link to="/admin/shops" className="text-[12.5px] font-medium text-emerald hover:underline">
            View all
          </Link>
        </div>
        {recentShops.length === 0 ? (
          <div className="text-[13.5px] text-slate">No shops yet — add your first one.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {recentShops.map((s) => (
              <Link
                key={s.id}
                to={`/admin/shops/${s.id}`}
                className="flex items-center justify-between gap-3 rounded-sm px-1 py-1.5 hover:bg-navy"
              >
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-medium text-offwhite">{s.name}</div>
                  <div className="truncate text-[11.5px] text-slate">{s.phone ?? "No phone on file"}</div>
                </div>
                <span className={`flex-shrink-0 rounded-pill px-2.5 py-1 text-[11px] font-medium ${billingStyle[s.billing_status]}`}>
                  {s.billing_status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
