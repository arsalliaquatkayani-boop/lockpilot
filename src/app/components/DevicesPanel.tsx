import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer, Device } from "../../lib/types";
import { useAuth } from "../../context/AuthContext";
import { buildPaymentSchedule } from "../lib/schedule";

const statusStyles: Record<Device["status"], string> = {
  active: "text-emerald",
  locked: "text-danger",
  paid_off: "text-slate-light",
  inactive: "text-slate-light",
};

export function DevicesPanel({
  devices,
  customers,
  onChanged,
}: {
  devices: Device[];
  customers: Customer[];
  onChanged: () => void;
}) {
  const { shop, staff } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const [customerId, setCustomerId] = useState("");
  const [deviceLabel, setDeviceLabel] = useState("");
  const [imei, setImei] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [downPayment, setDownPayment] = useState("0");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [installmentCount, setInstallmentCount] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "monthly">("monthly");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));

  const customerName = (id: string | null) =>
    customers.find((c) => c.id === id)?.full_name ?? "—";

  async function handleToggleLock(device: Device) {
    if (!shop) return;
    setTogglingId(device.id);

    const willLock = device.status !== "locked";
    const { error: updateError } = await supabase
      .from("devices")
      .update({
        should_be_locked: willLock,
        status: willLock ? "locked" : "active",
      })
      .eq("id", device.id);

    if (!updateError) {
      await supabase.from("lock_events").insert({
        shop_id: shop.id,
        device_id: device.id,
        event_type: willLock ? "manual_lock" : "manual_unlock",
        triggered_by: staff?.id ?? null,
      });
    }

    setTogglingId(null);
    onChanged();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!shop) return;
    setSubmitting(true);
    setError(null);

    const { data: newDevice, error: deviceError } = await supabase
      .from("devices")
      .insert({
        shop_id: shop.id,
        customer_id: customerId || null,
        device_label: deviceLabel,
        imei: imei || null,
        sale_price: totalAmount ? Number(totalAmount) : null,
        status: "active",
        should_be_locked: false,
      })
      .select()
      .single();

    if (deviceError || !newDevice) {
      setError(deviceError?.message ?? "Could not create device.");
      setSubmitting(false);
      return;
    }

    const plan = {
      shop_id: shop.id,
      device_id: newDevice.id,
      customer_id: customerId,
      total_amount: Number(totalAmount),
      down_payment: Number(downPayment || 0),
      installment_amount: Number(installmentAmount),
      installment_count: Number(installmentCount),
      frequency,
      start_date: startDate,
      status: "active" as const,
    };

    const { data: newPlan, error: planError } = await supabase
      .from("installment_plans")
      .insert(plan)
      .select()
      .single();

    if (planError || !newPlan) {
      setError(planError?.message ?? "Could not create installment plan.");
      setSubmitting(false);
      return;
    }

    const dueDates = buildPaymentSchedule(plan);
    const paymentRows = dueDates.map((due_date) => ({
      shop_id: shop.id,
      installment_plan_id: newPlan.id,
      amount: plan.installment_amount,
      due_date,
    }));

    const { error: paymentsError } = await supabase.from("payments").insert(paymentRows);
    if (paymentsError) {
      setError(`Device and plan saved, but payment schedule failed: ${paymentsError.message}`);
      setSubmitting(false);
      onChanged();
      return;
    }

    setSubmitting(false);
    setShowForm(false);
    setCustomerId("");
    setDeviceLabel("");
    setImei("");
    setTotalAmount("");
    setDownPayment("0");
    setInstallmentAmount("");
    setInstallmentCount("");
    onChanged();
  }

  return (
    <div className="rounded-card border border-line-dark bg-navy-deep p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-white">Devices</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="rounded-sm border border-white/25 px-3 py-1.5 text-[13px] text-white hover:border-white/60"
        >
          {showForm ? "Cancel" : "Add device + plan"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-5 grid gap-3 border-b border-line-dark pb-5 md:grid-cols-3">
          <select
            required
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          >
            <option value="">Select customer…</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name}
              </option>
            ))}
          </select>
          <input
            required
            placeholder="Device label (e.g. Samsung A54)"
            value={deviceLabel}
            onChange={(e) => setDeviceLabel(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          <input
            placeholder="IMEI"
            value={imei}
            onChange={(e) => setImei(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          <input
            required
            type="number"
            min="0"
            placeholder="Total amount (Rs)"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          <input
            type="number"
            min="0"
            placeholder="Down payment (Rs)"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          <input
            required
            type="number"
            min="0"
            placeholder="Installment amount (Rs)"
            value={installmentAmount}
            onChange={(e) => setInstallmentAmount(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          <input
            required
            type="number"
            min="1"
            placeholder="Number of installments"
            value={installmentCount}
            onChange={(e) => setInstallmentCount(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as "weekly" | "monthly")}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
          <input
            required
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />

          {error && <div className="text-[13px] text-danger md:col-span-3">{error}</div>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-sm bg-emerald px-4 py-2 text-[13.5px] font-semibold text-white hover:bg-emerald-deep disabled:opacity-60 md:col-span-3 md:w-fit"
          >
            {submitting ? "Saving…" : "Save device + plan"}
          </button>
        </form>
      )}

      {devices.length === 0 ? (
        <div className="text-[13.5px] text-slate-light">No devices yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-slate-light">
                <th className="pb-2 font-medium">Device</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id} className="border-t border-line-dark text-white">
                  <td className="py-2">{d.device_label ?? "—"}</td>
                  <td className="py-2 text-slate-light">{customerName(d.customer_id)}</td>
                  <td className={`py-2 font-medium ${statusStyles[d.status]}`}>{d.status}</td>
                  <td className="py-2 text-right">
                    {(d.status === "active" || d.status === "locked") && (
                      <button
                        onClick={() => handleToggleLock(d)}
                        disabled={togglingId === d.id}
                        className="rounded-sm border border-white/25 px-3 py-1 text-[12.5px] text-white hover:border-white/60 disabled:opacity-60"
                      >
                        {togglingId === d.id
                          ? "Working…"
                          : d.status === "locked"
                            ? "Unlock"
                            : "Lock"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
