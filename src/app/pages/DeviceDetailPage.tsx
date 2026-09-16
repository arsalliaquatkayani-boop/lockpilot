import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Button } from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { useShopData } from "../lib/useShopData";

function formatPkr(amount: number) {
  return `Rs ${Math.round(amount).toLocaleString("en-PK")}`;
}

const statusStyle: Record<string, string> = {
  Paid: "bg-line/60 text-slate",
  Overdue: "bg-danger-soft text-danger",
  Active: "bg-success-soft text-success",
};

const deviceStatusStyle: Record<string, string> = {
  active: "bg-success-soft text-success",
  locked: "border border-danger text-danger",
  paid_off: "bg-line/60 text-slate",
  inactive: "bg-line/60 text-slate",
};

export function DeviceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { shop, staff } = useAuth();
  const { devices, customers, plans, payments, loading, error, reload } = useShopData();
  const [togglingLock, setTogglingLock] = useState(false);
  const [marking, setMarking] = useState<string | null>(null);

  const device = devices.find((d) => d.id === id);
  const customer = device ? customers.find((c) => c.id === device.customer_id) : undefined;
  const plan = device ? plans.find((p) => p.device_id === device.id) : undefined;

  const devicePayments = useMemo(() => {
    if (!plan) return [];
    return payments
      .filter((p) => p.installment_plan_id === plan.id)
      .sort((a, b) => a.due_date.localeCompare(b.due_date));
  }, [payments, plan]);

  const today = new Date().toISOString().slice(0, 10);
  const paidCount = devicePayments.filter((p) => p.paid_date !== null).length;
  const paidTotal = devicePayments.filter((p) => p.paid_date).reduce((s, p) => s + Number(p.amount), 0);
  const outstanding = devicePayments.filter((p) => !p.paid_date).reduce((s, p) => s + Number(p.amount), 0);

  async function handleToggleLock() {
    if (!device || !shop) return;
    setTogglingLock(true);
    const willLock = device.status !== "locked";
    const { error: updateError } = await supabase
      .from("devices")
      .update({ should_be_locked: willLock, status: willLock ? "locked" : "active" })
      .eq("id", device.id);

    if (!updateError) {
      await supabase.from("lock_events").insert({
        shop_id: shop.id,
        device_id: device.id,
        event_type: willLock ? "manual_lock" : "manual_unlock",
        triggered_by: staff?.id ?? null,
      });
    }
    setTogglingLock(false);
    reload();
  }

  async function handleMarkPaid(paymentId: string) {
    setMarking(paymentId);
    await supabase
      .from("payments")
      .update({ paid_date: new Date().toISOString().slice(0, 10), recorded_by: staff?.id ?? null })
      .eq("id", paymentId);
    setMarking(null);
    reload();
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="text-[13.5px] text-slate">Loading…</div>
      </AppLayout>
    );
  }

  if (!device) {
    return (
      <AppLayout>
        <div className="rounded-card border border-line p-6 text-[13.5px] text-slate">
          Device not found. <Link to="/app/devices" className="text-emerald hover:underline">Back to devices</Link>
        </div>
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

      <Link to="/app/devices" className="mb-4 inline-block text-[12.5px] text-slate hover:text-emerald">
        ← Back to devices
      </Link>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-[24px] font-extrabold text-offwhite">{device.device_label ?? "Device"}</h1>
          {customer && (
            <Link to={`/app/customers/${customer.id}`} className="text-[13px] text-slate hover:text-emerald hover:underline">
              {customer.full_name}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-pill px-3 py-1.5 font-mono text-[12px] ${deviceStatusStyle[device.status]}`}>
            {device.status}
          </span>
          {(device.status === "active" || device.status === "locked") && (
            <Button variant="primary" size="sm" disabled={togglingLock} onClick={handleToggleLock}>
              {togglingLock ? "Working…" : device.status === "locked" ? "Unlock device" : "Lock device"}
            </Button>
          )}
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total mobile cost" value={formatPkr(device.sale_price ?? 0)} />
        <StatCard label="Paid so far" value={`${paidCount} / ${devicePayments.length}`} sub={formatPkr(paidTotal)} tone="positive" />
        <StatCard label="Remaining" value={formatPkr(outstanding)} tone={outstanding > 0 ? "warning" : undefined} />
        <StatCard label="IMEI(s)" value={device.imeis && device.imeis.length > 0 ? device.imeis.join(", ") : "—"} small />
      </div>

      {plan && (
        <div className="mb-6 rounded-card border border-line p-6">
          <h2 className="mb-4 font-heading text-[16px] font-bold text-offwhite">Installment plan</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Total Amount" value={formatPkr(plan.total_amount)} />
            <Field label="Down Payment" value={formatPkr(plan.down_payment)} />
            <Field label="Installment" value={`${formatPkr(plan.installment_amount)} / ${plan.frequency === "monthly" ? "mo" : "wk"}`} />
            <Field label="Start Date" value={plan.start_date} />
            <Field label="Due Day" value={plan.due_day_of_month ? `Day ${plan.due_day_of_month} of month` : "Same as start date"} />
            <Field label="Status" value={plan.status} />
          </div>
        </div>
      )}

      <div className="rounded-card border border-line p-6">
        <h2 className="mb-4 font-heading text-[16px] font-bold text-offwhite">Payment ledger</h2>
        {devicePayments.length === 0 ? (
          <div className="text-[13.5px] text-slate">No payment schedule found for this device.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-slate">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                  <th className="pb-2.5 font-normal">Due Date</th>
                  <th className="pb-2.5 font-normal">Amount</th>
                  <th className="pb-2.5 font-normal">Status</th>
                  <th className="pb-2.5 font-normal">Paid Date</th>
                  <th className="pb-2.5 font-normal" />
                </tr>
              </thead>
              <tbody>
                {devicePayments.map((p) => {
                  const overdue = !p.paid_date && p.due_date < today;
                  const status = p.paid_date ? "Paid" : overdue ? "Overdue" : "Active";
                  return (
                    <tr key={p.id} className="border-b border-line last:border-none">
                      <td className="py-2.5 font-mono">{p.due_date}</td>
                      <td className="py-2.5 font-mono">{formatPkr(Number(p.amount))}</td>
                      <td className="py-2.5">
                        <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium ${statusStyle[status]}`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono">{p.paid_date ?? "—"}</td>
                      <td className="py-2.5 text-right">
                        {!p.paid_date && (
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={marking === p.id}
                            onClick={() => handleMarkPaid(p.id)}
                          >
                            {marking === p.id ? "Saving…" : "Mark paid"}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
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
  sub,
  tone,
  small,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "positive" | "warning";
  small?: boolean;
}) {
  const toneClass = tone === "positive" ? "text-success" : tone === "warning" ? "text-warning" : "text-offwhite";
  return (
    <div className="rounded-card border border-line p-4">
      <div className="mb-1.5 text-[12px] text-slate">{label}</div>
      <div className={`font-heading font-extrabold tabular-nums ${toneClass} ${small ? "text-[13.5px]" : "text-[19px]"}`}>
        {value}
      </div>
      {sub && <div className="text-[11px] text-slate">{sub}</div>}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1.5 font-mono text-[11.5px] uppercase tracking-wide text-slate">{label}</div>
      <div className="text-[13.5px] text-offwhite">{value}</div>
    </div>
  );
}
