import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer, Device, InstallmentPlan, Payment } from "../../lib/types";
import { useAuth } from "../../context/AuthContext";

export function PaymentsPanel({
  payments,
  plans,
  devices,
  customers,
  onChanged,
}: {
  payments: Payment[];
  plans: InstallmentPlan[];
  devices: Device[];
  customers: Customer[];
  onChanged: () => void;
}) {
  const { staff } = useAuth();
  const [markingId, setMarkingId] = useState<string | null>(null);

  const pending = payments
    .filter((p) => p.paid_date === null)
    .sort((a, b) => a.due_date.localeCompare(b.due_date))
    .slice(0, 25);

  const today = new Date().toISOString().slice(0, 10);

  function describe(payment: Payment) {
    const plan = plans.find((p) => p.id === payment.installment_plan_id);
    const device = plan ? devices.find((d) => d.id === plan.device_id) : undefined;
    const customer = plan ? customers.find((c) => c.id === plan.customer_id) : undefined;
    return {
      device: device?.device_label ?? "—",
      customer: customer?.full_name ?? "—",
    };
  }

  async function handleMarkPaid(payment: Payment) {
    setMarkingId(payment.id);
    await supabase
      .from("payments")
      .update({ paid_date: new Date().toISOString().slice(0, 10), recorded_by: staff?.id ?? null })
      .eq("id", payment.id);
    setMarkingId(null);
    onChanged();
  }

  return (
    <div className="rounded-card border border-line-dark bg-navy-deep p-5">
      <h2 className="mb-4 text-[15px] font-semibold text-white">Upcoming &amp; overdue payments</h2>

      {pending.length === 0 ? (
        <div className="text-[13.5px] text-slate-light">Nothing due — all caught up.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-slate-light">
                <th className="pb-2 font-medium">Due date</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Device</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {pending.map((p) => {
                const { device, customer } = describe(p);
                const overdue = p.due_date < today;
                return (
                  <tr key={p.id} className="border-t border-line-dark text-white">
                    <td className={`py-2 ${overdue ? "text-danger" : ""}`}>{p.due_date}</td>
                    <td className="py-2 text-slate-light">{customer}</td>
                    <td className="py-2 text-slate-light">{device}</td>
                    <td className="py-2">Rs {Number(p.amount).toLocaleString("en-PK")}</td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => handleMarkPaid(p)}
                        disabled={markingId === p.id}
                        className="rounded-sm bg-emerald px-3 py-1 text-[12.5px] font-semibold text-white hover:bg-emerald-deep disabled:opacity-60"
                      >
                        {markingId === p.id ? "Saving…" : "Mark paid"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
