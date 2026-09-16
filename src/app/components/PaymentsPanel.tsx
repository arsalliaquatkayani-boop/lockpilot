import { useState } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer, Device, InstallmentPlan, Payment } from "../../lib/types";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";

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
    <div className="rounded-card border border-line bg-navy-secondary p-6">
      <h2 className="mb-5 font-heading text-[17px] font-extrabold text-offwhite">
        Upcoming &amp; overdue payments
      </h2>

      {pending.length === 0 ? (
        <div className="text-[13.5px] text-slate">Nothing due — all caught up.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px] text-slate">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                <th className="pb-3 font-normal">Due Date</th>
                <th className="pb-3 font-normal">Customer</th>
                <th className="pb-3 font-normal">Device</th>
                <th className="pb-3 font-normal">Amount</th>
                <th className="pb-3 font-normal" />
              </tr>
            </thead>
            <tbody>
              {pending.map((p) => {
                const { device, customer } = describe(p);
                const overdue = p.due_date < today;
                return (
                  <tr key={p.id} className="border-b border-line last:border-none">
                    <td className={`py-3 font-mono ${overdue ? "text-danger" : "text-offwhite"}`}>
                      {p.due_date}
                    </td>
                    <td className="py-3">{customer}</td>
                    <td className="py-3">{device}</td>
                    <td className="py-3 font-mono tabular-nums text-offwhite">
                      Rs {Number(p.amount).toLocaleString("en-PK")}
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={markingId === p.id}
                        onClick={() => handleMarkPaid(p)}
                      >
                        {markingId === p.id ? "Saving…" : "Mark paid"}
                      </Button>
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
