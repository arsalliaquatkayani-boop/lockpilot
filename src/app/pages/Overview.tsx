import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Button } from "../../components/Button";
import { DashboardChart } from "../../components/DashboardChart";
import { useAuth } from "../../context/AuthContext";
import { useShopData } from "../lib/useShopData";

function formatPkr(amount: number) {
  return `Rs ${Math.round(amount).toLocaleString("en-PK")}`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const statusStyle: Record<string, string> = {
  Active: "bg-success-soft text-success",
  "Due Soon": "bg-warning-soft text-warning",
  Overdue: "bg-danger-soft text-danger",
  Locked: "border border-danger text-danger",
  Paid: "bg-line/60 text-slate",
};

export function Overview() {
  const { staff } = useAuth();
  const { customers, devices, plans, payments, loading, error } = useShopData();

  const today = new Date().toISOString().slice(0, 10);

  const stats = useMemo(() => {
    const activeInstallments = plans.filter((p) => p.status === "active").length;
    const outstanding = payments
      .filter((p) => p.paid_date === null)
      .reduce((sum, p) => sum + Number(p.amount), 0);
    const overdueCount = payments.filter((p) => p.paid_date === null && p.due_date < today).length;
    return {
      customers: customers.length,
      activeInstallments,
      outstanding,
      overdueCount,
    };
  }, [customers, plans, payments, today]);

  const recentPlans = useMemo(() => {
    return plans.slice(0, 6).map((plan) => {
      const customer = customers.find((c) => c.id === plan.customer_id);
      const device = devices.find((d) => d.id === plan.device_id);
      const planPayments = payments.filter((p) => p.installment_plan_id === plan.id);
      const unpaid = planPayments.filter((p) => p.paid_date === null);
      const outstanding = unpaid.reduce((sum, p) => sum + Number(p.amount), 0);
      const nextDue = unpaid.sort((a, b) => a.due_date.localeCompare(b.due_date))[0];
      const overdue = unpaid.some((p) => p.due_date < today);

      let status = "Active";
      if (device?.status === "locked") status = "Locked";
      else if (overdue) status = "Overdue";
      else if (unpaid.length === 0) status = "Paid";
      else if (nextDue && nextDue.due_date <= new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10))
        status = "Due Soon";

      return {
        id: plan.id,
        customer: customer?.full_name ?? "—",
        device: device?.device_label ?? "—",
        installment: `Rs ${Number(plan.installment_amount).toLocaleString("en-PK")} / ${plan.frequency === "monthly" ? "mo" : "wk"}`,
        nextDue: nextDue?.due_date ?? "—",
        outstanding: formatPkr(outstanding),
        status,
      };
    });
  }, [plans, customers, devices, payments, today]);

  const upcoming = useMemo(() => {
    return payments
      .filter((p) => p.paid_date === null)
      .sort((a, b) => a.due_date.localeCompare(b.due_date))
      .slice(0, 4)
      .map((p) => {
        const plan = plans.find((pl) => pl.id === p.installment_plan_id);
        const customer = plan ? customers.find((c) => c.id === plan.customer_id) : undefined;
        const device = plan ? devices.find((d) => d.id === plan.device_id) : undefined;
        return {
          id: p.id,
          customer: customer?.full_name ?? "—",
          device: device?.device_label ?? "—",
          amount: formatPkr(Number(p.amount)),
          due: p.due_date,
        };
      });
  }, [payments, plans, customers, devices]);

  if (loading) {
    return (
      <AppLayout>
        <div className="text-[13.5px] text-slate">Loading your shop's data…</div>
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

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-[12.5px] uppercase tracking-wide text-slate">
            {new Date().toLocaleDateString("en-US", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
          </div>
          <h1 className="mt-1 font-heading text-[24px] font-extrabold text-offwhite">
            {greeting()}{staff?.full_name ? `, ${staff.full_name.split(" ")[0]}` : ""}
          </h1>
        </div>
        <Button to="/app/devices" variant="primary" size="sm">
          + New Installment
        </Button>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total customers" value={String(stats.customers)} />
        <StatCard label="Active installments" value={String(stats.activeInstallments)} tone="positive" />
        <StatCard label="Outstanding amount" value={formatPkr(stats.outstanding)} tone="warning" />
        <StatCard label="Overdue payments" value={String(stats.overdueCount)} tone={stats.overdueCount > 0 ? "danger" : undefined} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <DashboardChart />
        <div className="rounded-card border border-line-dark p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-[14.5px] font-bold text-offwhite">Upcoming payments</h2>
            <Link to="/app/payments" className="text-[12.5px] font-medium text-emerald hover:underline">
              View all
            </Link>
          </div>
          {upcoming.length === 0 ? (
            <div className="text-[13px] text-slate">Nothing due — all caught up.</div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-soft text-[11px] font-bold text-emerald-deep">
                      {p.customer.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium text-offwhite">{p.customer}</div>
                      <div className="truncate text-[11.5px] text-slate">{p.device}</div>
                    </div>
                  </div>
                  <span className="flex-shrink-0 font-mono text-[13px] text-offwhite">{p.amount}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-card border border-line-dark p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-[14.5px] font-bold text-offwhite">Recent customer plans</h2>
          <Link to="/app/customers" className="text-[12.5px] font-medium text-emerald hover:underline">
            View all
          </Link>
        </div>
        {recentPlans.length === 0 ? (
          <div className="text-[13.5px] text-slate">No installment plans yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-slate">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                  <th className="pb-2.5 font-normal">Customer</th>
                  <th className="pb-2.5 font-normal">Device</th>
                  <th className="pb-2.5 font-normal">Installment</th>
                  <th className="pb-2.5 font-normal">Next Due</th>
                  <th className="pb-2.5 font-normal">Outstanding</th>
                  <th className="pb-2.5 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPlans.map((p) => (
                  <tr key={p.id} className="border-b border-line last:border-none">
                    <td className="py-2.5 font-medium text-offwhite">{p.customer}</td>
                    <td className="py-2.5">{p.device}</td>
                    <td className="py-2.5 font-mono">{p.installment}</td>
                    <td className="py-2.5">{p.nextDue}</td>
                    <td className="py-2.5 font-mono">{p.outstanding}</td>
                    <td className="py-2.5">
                      <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium ${statusStyle[p.status]}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive" | "warning" | "danger";
}) {
  const toneClass =
    tone === "positive"
      ? "text-success"
      : tone === "warning"
        ? "text-warning"
        : tone === "danger"
          ? "text-danger"
          : "text-offwhite";
  return (
    <div className="rounded-card border border-line-dark p-4">
      <div className="mb-1.5 text-[12px] text-slate">{label}</div>
      <div className={`font-heading text-[22px] font-extrabold tabular-nums ${toneClass}`}>{value}</div>
    </div>
  );
}
