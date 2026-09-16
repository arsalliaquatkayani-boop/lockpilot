import { Fragment, useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer, Device } from "../../lib/types";
import { useAuth } from "../../context/AuthContext";
import { buildPaymentSchedule } from "../lib/schedule";
import { Button } from "../../components/Button";

const statusPillStyles: Record<Device["status"], string> = {
  active: "bg-emerald/15 text-emerald-bright",
  locked: "border border-danger text-danger",
  paid_off: "bg-line/60 text-slate",
  inactive: "bg-line/60 text-slate",
};

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[13.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11.5px] uppercase tracking-wide text-slate";

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
  const [pairingRevealId, setPairingRevealId] = useState<string | null>(null);

  const [customerId, setCustomerId] = useState("");
  const [deviceLabel, setDeviceLabel] = useState("");
  const [imeis, setImeis] = useState<string[]>([""]);
  const [totalAmount, setTotalAmount] = useState("");
  const [downPayment, setDownPayment] = useState("0");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [installmentCount, setInstallmentCount] = useState("");
  const [frequency, setFrequency] = useState<"weekly" | "monthly">("monthly");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [dueDayOfMonth, setDueDayOfMonth] = useState("");

  function updateImei(index: number, value: string) {
    setImeis((prev) => prev.map((v, i) => (i === index ? value : v)));
  }
  function addImeiField() {
    setImeis((prev) => [...prev, ""]);
  }
  function removeImeiField(index: number) {
    setImeis((prev) => prev.filter((_, i) => i !== index));
  }

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

    const cleanImeis = imeis.map((v) => v.trim()).filter(Boolean);

    const { data: newDevice, error: deviceError } = await supabase
      .from("devices")
      .insert({
        shop_id: shop.id,
        customer_id: customerId || null,
        device_label: deviceLabel,
        imei: cleanImeis[0] ?? null,
        imeis: cleanImeis,
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
      due_day_of_month: frequency === "monthly" && dueDayOfMonth ? Number(dueDayOfMonth) : null,
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
    setImeis([""]);
    setTotalAmount("");
    setDownPayment("0");
    setInstallmentAmount("");
    setInstallmentCount("");
    setDueDayOfMonth("");
    onChanged();
  }

  return (
    <div className="rounded-card border border-line bg-navy-secondary p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-[17px] font-extrabold text-offwhite">Devices</h2>
        <Button variant={showForm ? "ghost-dark" : "secondary"} size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "Add device + plan"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4 border-b border-line pb-6 md:grid-cols-3">
          <div>
            <label className={labelClass}>Customer</label>
            <select
              required
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className={inputClass}
            >
              <option value="">Select customer…</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.full_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Device</label>
            <input
              required
              placeholder="e.g. Samsung A54"
              value={deviceLabel}
              onChange={(e) => setDeviceLabel(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-3">
            <label className={labelClass}>IMEI(s)</label>
            <div className="flex flex-col gap-2">
              {imeis.map((value, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    placeholder={i === 0 ? "IMEI 1 (optional)" : `IMEI ${i + 1}`}
                    value={value}
                    onChange={(e) => updateImei(i, e.target.value)}
                    className={inputClass}
                  />
                  {imeis.length > 1 && (
                    <Button type="button" variant="ghost-dark" size="sm" onClick={() => removeImeiField(i)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="ghost-dark" size="sm" className="w-fit" onClick={addImeiField}>
                + Add another IMEI
              </Button>
            </div>
            <p className="mt-1.5 text-[12px] text-slate">
              Dual-SIM phones usually have two IMEI numbers — add both if known.
            </p>
          </div>
          <div>
            <label className={labelClass}>Total Amount (Rs)</label>
            <input
              required
              type="number"
              min="0"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Down Payment (Rs)</label>
            <input
              type="number"
              min="0"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Installment Amount (Rs)</label>
            <input
              required
              type="number"
              min="0"
              value={installmentAmount}
              onChange={(e) => setInstallmentAmount(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Number of Installments</label>
            <input
              required
              type="number"
              min="1"
              value={installmentCount}
              onChange={(e) => setInstallmentCount(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as "weekly" | "monthly")}
              className={inputClass}
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Start Date</label>
            <input
              required
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
            />
          </div>
          {frequency === "monthly" && (
            <div>
              <label className={labelClass}>Due Day of Month</label>
              <input
                type="number"
                min="1"
                max="31"
                placeholder="e.g. 5"
                value={dueDayOfMonth}
                onChange={(e) => setDueDayOfMonth(e.target.value)}
                className={inputClass}
              />
              <p className="mt-1.5 text-[12px] text-slate">
                Leave blank to use the start date's day each month.
              </p>
            </div>
          )}

          {error && <div className="text-[13px] text-danger md:col-span-3">{error}</div>}
          <div className="md:col-span-3">
            <Button type="submit" variant="primary" size="sm" disabled={submitting}>
              {submitting ? "Saving…" : "Save device + plan"}
            </Button>
          </div>
        </form>
      )}

      {devices.length === 0 ? (
        <div className="text-[13.5px] text-slate">No devices yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px] text-slate">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                <th className="pb-3 font-normal">Device</th>
                <th className="pb-3 font-normal">Customer</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal" />
                <th className="pb-3 font-normal" />
              </tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <Fragment key={d.id}>
                  <tr className="border-b border-line last:border-none">
                    <td className="py-3 text-offwhite">{d.device_label ?? "—"}</td>
                    <td className="py-3">{customerName(d.customer_id)}</td>
                    <td className="py-3">
                      <span className={`rounded-pill px-2.5 py-1 font-mono text-[11px] ${statusPillStyles[d.status]}`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {(d.status === "active" || d.status === "locked") && (
                        <Button
                          variant="ghost-dark"
                          size="sm"
                          disabled={togglingId === d.id}
                          onClick={() => handleToggleLock(d)}
                        >
                          {togglingId === d.id
                            ? "Working…"
                            : d.status === "locked"
                              ? "Unlock"
                              : "Lock"}
                        </Button>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost-dark"
                        size="sm"
                        onClick={() => setPairingRevealId(pairingRevealId === d.id ? null : d.id)}
                      >
                        {pairingRevealId === d.id ? "Hide" : "Pair phone"}
                      </Button>
                    </td>
                  </tr>
                  {pairingRevealId === d.id && (
                    <tr className="border-b border-line last:border-none">
                      <td colSpan={5} className="bg-navy py-3 px-3 rounded-sm">
                        <div className="text-[12.5px] text-slate">
                          Enter these two values into the "Pair this device" screen on the
                          customer's phone, once, during setup:
                        </div>
                        <div className="mt-2 grid gap-1 font-mono text-[12.5px] text-offwhite">
                          <div>Device ID: {d.id}</div>
                          <div>Pairing code: {d.device_secret ?? "—"}</div>
                          {d.imeis && d.imeis.length > 0 && (
                            <div>IMEI{d.imeis.length > 1 ? "s" : ""}: {d.imeis.join(", ")}</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
