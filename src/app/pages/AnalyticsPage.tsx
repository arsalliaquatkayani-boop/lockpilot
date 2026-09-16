import { useMemo } from "react";
import { AppLayout } from "../components/AppLayout";
import { useShopData } from "../lib/useShopData";
import type { DeviceStatus } from "../../lib/types";

function formatPkr(amount: number) {
  return `Rs ${Math.round(amount).toLocaleString("en-PK")}`;
}

const statusLabels: Record<DeviceStatus, string> = {
  active: "Active",
  locked: "Locked",
  paid_off: "Paid Off",
  inactive: "Inactive",
};

const statusColors: Record<DeviceStatus, string> = {
  active: "bg-success",
  locked: "bg-danger",
  paid_off: "bg-slate-light",
  inactive: "bg-line",
};

function monthKey(dateStr: string) {
  return dateStr.slice(0, 7);
}

function monthLabel(key: string) {
  const [y, m] = key.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-US", { month: "short" });
}

export function AnalyticsPage() {
  const { customers, devices, plans, payments, loading, error } = useShopData();

  const deviceBreakdown = useMemo(() => {
    const counts: Record<DeviceStatus, number> = { active: 0, locked: 0, paid_off: 0, inactive: 0 };
    devices.forEach((d) => {
      counts[d.status] += 1;
    });
    return counts;
  }, [devices]);

  const monthlyTrend = useMemo(() => {
    const months: string[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    }
    const collected: Record<string, number> = Object.fromEntries(months.map((m) => [m, 0]));
    const overdue: Record<string, number> = Object.fromEntries(months.map((m) => [m, 0]));

    payments.forEach((p) => {
      if (p.paid_date && collected[monthKey(p.paid_date)] !== undefined) {
        collected[monthKey(p.paid_date)] += Number(p.amount);
      }
      if (!p.paid_date && overdue[monthKey(p.due_date)] !== undefined) {
        overdue[monthKey(p.due_date)] += Number(p.amount);
      }
    });

    const max = Math.max(1, ...months.map((m) => Math.max(collected[m], overdue[m])));
    return { months, collected, overdue, max };
  }, [payments]);

  const topOverdue = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const byCustomer = new Map<string, number>();
    payments
      .filter((p) => p.paid_date === null && p.due_date < today)
      .forEach((p) => {
        const plan = plans.find((pl) => pl.id === p.installment_plan_id);
        if (!plan) return;
        byCustomer.set(plan.customer_id, (byCustomer.get(plan.customer_id) ?? 0) + Number(p.amount));
      });
    return [...byCustomer.entries()]
      .map(([customerId, amount]) => ({
        customer: customers.find((c) => c.id === customerId)?.full_name ?? "—",
        amount,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [payments, plans, customers]);

  const totalDevices = devices.length;

  if (loading) {
    return (
      <AppLayout>
        <div className="text-[13.5px] text-slate">Loading…</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      {error && (
        <div className="mb-6 rounded-sm border border-danger/40 bg-danger-soft px-4 py-3 text-[13.5px] text-danger">
          {error}
        </div>
      )}
      <h1 className="mb-6 font-heading text-[24px] font-extrabold text-offwhite">Analytics</h1>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-card border border-line p-5">
          <div className="mb-4 text-[12.5px] text-slate">Collected vs. overdue — last 6 months</div>
          <div className="flex h-[160px] items-end gap-4">
            {monthlyTrend.months.map((m) => (
              <div key={m} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-[130px] w-full items-end justify-center gap-1.5">
                  <div
                    className="w-3.5 rounded-t-sm bg-emerald"
                    style={{ height: `${(monthlyTrend.collected[m] / monthlyTrend.max) * 100}%` }}
                  />
                  <div
                    className="w-3.5 rounded-t-sm bg-danger/70"
                    style={{ height: `${(monthlyTrend.overdue[m] / monthlyTrend.max) * 100}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-light">{monthLabel(m)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-[12px] text-slate">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald" /> Collected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-danger/70" /> Overdue
            </span>
          </div>
        </div>

        <div className="rounded-card border border-line p-5">
          <div className="mb-4 text-[12.5px] text-slate">Device status breakdown</div>
          <div className="flex flex-col gap-3">
            {(Object.keys(statusLabels) as DeviceStatus[]).map((status) => {
              const count = deviceBreakdown[status];
              const pct = totalDevices > 0 ? Math.round((count / totalDevices) * 100) : 0;
              return (
                <div key={status}>
                  <div className="mb-1 flex items-center justify-between text-[12.5px]">
                    <span className="text-offwhite">{statusLabels[status]}</span>
                    <span className="font-mono text-slate">{count}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-pill bg-line">
                    <div className={`h-full rounded-pill ${statusColors[status]}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-card border border-line p-5">
          <div className="mb-4 text-[12.5px] text-slate">Quick totals</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="mb-1 text-[11.5px] text-slate">Customers</div>
              <div className="font-heading text-[19px] font-extrabold text-offwhite">{customers.length}</div>
            </div>
            <div>
              <div className="mb-1 text-[11.5px] text-slate">Devices</div>
              <div className="font-heading text-[19px] font-extrabold text-offwhite">{totalDevices}</div>
            </div>
            <div>
              <div className="mb-1 text-[11.5px] text-slate">Total collected</div>
              <div className="font-heading text-[19px] font-extrabold text-success">
                {formatPkr(payments.filter((p) => p.paid_date).reduce((s, p) => s + Number(p.amount), 0))}
              </div>
            </div>
            <div>
              <div className="mb-1 text-[11.5px] text-slate">Total outstanding</div>
              <div className="font-heading text-[19px] font-extrabold text-warning">
                {formatPkr(payments.filter((p) => !p.paid_date).reduce((s, p) => s + Number(p.amount), 0))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-card border border-line p-5">
          <div className="mb-4 text-[12.5px] text-slate">Top overdue customers</div>
          {topOverdue.length === 0 ? (
            <div className="text-[13px] text-slate">No overdue payments — all caught up.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {topOverdue.map((row) => (
                <div key={row.customer} className="flex items-center justify-between text-[13px]">
                  <span className="text-offwhite">{row.customer}</span>
                  <span className="font-mono text-danger">{formatPkr(row.amount)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
