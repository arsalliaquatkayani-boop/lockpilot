import { useMemo, useState } from "react";
import { AppLayout } from "../components/AppLayout";
import { Button } from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useShopData } from "../lib/useShopData";

function formatPkr(amount: number) {
  return `Rs ${Math.round(amount).toLocaleString("en-PK")}`;
}

const statusStyle: Record<string, string> = {
  active: "bg-success-soft text-success",
  completed: "bg-line/60 text-slate",
  defaulted: "border border-danger text-danger",
};

export function PlansPage() {
  const { plans, customers, devices, payments, loading, error, reload } = useShopData();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const rows = useMemo(() => {
    return plans.map((plan) => {
      const customer = customers.find((c) => c.id === plan.customer_id);
      const device = devices.find((d) => d.id === plan.device_id);
      const planPayments = payments.filter((p) => p.installment_plan_id === plan.id);
      const paidCount = planPayments.filter((p) => p.paid_date !== null).length;
      return {
        plan,
        customer: customer?.full_name ?? "—",
        device: device?.device_label ?? "—",
        paidCount,
        totalCount: planPayments.length || plan.installment_count,
      };
    });
  }, [plans, customers, devices, payments]);

  async function handleMarkCompleted(planId: string) {
    setUpdatingId(planId);
    await supabase.from("installment_plans").update({ status: "completed" }).eq("id", planId);
    setUpdatingId(null);
    reload();
  }

  return (
    <AppLayout>
      {error && (
        <div className="mb-6 rounded-sm border border-danger/40 bg-danger-soft px-4 py-3 text-[13.5px] text-danger">
          {error}
        </div>
      )}
      <h1 className="mb-6 font-heading text-[24px] font-extrabold text-offwhite">Installment Plans</h1>

      {loading ? (
        <div className="text-[13.5px] text-slate">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="rounded-card border border-line p-6 text-[13.5px] text-slate">
          No installment plans yet — create one from the Devices page.
        </div>
      ) : (
        <div className="rounded-card border border-line p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px] text-slate">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                  <th className="pb-3 font-normal">Customer</th>
                  <th className="pb-3 font-normal">Device</th>
                  <th className="pb-3 font-normal">Total</th>
                  <th className="pb-3 font-normal">Down Payment</th>
                  <th className="pb-3 font-normal">Installment</th>
                  <th className="pb-3 font-normal">Progress</th>
                  <th className="pb-3 font-normal">Status</th>
                  <th className="pb-3 font-normal" />
                </tr>
              </thead>
              <tbody>
                {rows.map(({ plan, customer, device, paidCount, totalCount }) => (
                  <tr key={plan.id} className="border-b border-line last:border-none">
                    <td className="py-3 font-medium text-offwhite">{customer}</td>
                    <td className="py-3">{device}</td>
                    <td className="py-3 font-mono">{formatPkr(plan.total_amount)}</td>
                    <td className="py-3 font-mono">{formatPkr(plan.down_payment)}</td>
                    <td className="py-3 font-mono">
                      {formatPkr(plan.installment_amount)} / {plan.frequency === "monthly" ? "mo" : "wk"}
                    </td>
                    <td className="py-3 font-mono">
                      {paidCount} / {totalCount}
                    </td>
                    <td className="py-3">
                      <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium ${statusStyle[plan.status]}`}>
                        {plan.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {plan.status === "active" && (
                        <Button
                          variant="ghost-dark"
                          size="sm"
                          disabled={updatingId === plan.id}
                          onClick={() => handleMarkCompleted(plan.id)}
                        >
                          Mark completed
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
