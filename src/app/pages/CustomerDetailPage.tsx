import { useMemo, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Button } from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useShopData } from "../lib/useShopData";

function formatPkr(amount: number) {
  return `Rs ${Math.round(amount).toLocaleString("en-PK")}`;
}

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[13.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11.5px] uppercase tracking-wide text-slate";

const statusStyle: Record<string, string> = {
  Active: "bg-success-soft text-success",
  "Due Soon": "bg-warning-soft text-warning",
  Overdue: "bg-danger-soft text-danger",
  Locked: "border border-danger text-danger",
  Paid: "bg-line/60 text-slate",
};

export function CustomerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { customers, devices, plans, payments, loading, error, reload } = useShopData();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [viewingId, setViewingId] = useState<string | null>(null);

  const customer = customers.find((c) => c.id === id);

  const [form, setForm] = useState<{
    full_name: string;
    phone: string;
    city: string;
    address: string;
    cnic_number: string;
    guarantor_name: string;
    guarantor_phone: string;
  } | null>(null);

  function startEditing() {
    if (!customer) return;
    setForm({
      full_name: customer.full_name ?? "",
      phone: customer.phone ?? "",
      city: customer.city ?? "",
      address: customer.address ?? "",
      cnic_number: customer.cnic_number ?? "",
      guarantor_name: customer.guarantor_name ?? "",
      guarantor_phone: customer.guarantor_phone ?? "",
    });
    setEditing(true);
  }

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!customer || !form) return;
    setSaving(true);
    setSaveError(null);

    const { error: updateError } = await supabase
      .from("customers")
      .update({
        full_name: form.full_name,
        phone: form.phone || null,
        city: form.city || null,
        address: form.address || null,
        cnic_number: form.cnic_number || null,
        guarantor_name: form.guarantor_name || null,
        guarantor_phone: form.guarantor_phone || null,
      })
      .eq("id", customer.id);

    setSaving(false);
    if (updateError) {
      setSaveError(updateError.message);
      return;
    }
    setEditing(false);
    reload();
  }

  async function handleViewId(side: "front" | "back") {
    if (!customer) return;
    const path = side === "front" ? customer.cnic_front_path : customer.cnic_back_path;
    if (!path) return;
    setViewingId(side);
    const { data, error: signError } = await supabase.storage
      .from("customer-documents")
      .createSignedUrl(path, 60);
    setViewingId(null);
    if (signError || !data) {
      setSaveError(signError?.message ?? "Could not open document.");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  const customerDevices = useMemo(
    () => devices.filter((d) => d.customer_id === id),
    [devices, id],
  );

  const deviceLedgers = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return customerDevices.map((device) => {
      const plan = plans.find((p) => p.device_id === device.id);
      const devicePayments = plan
        ? payments
            .filter((p) => p.installment_plan_id === plan.id)
            .sort((a, b) => a.due_date.localeCompare(b.due_date))
        : [];
      const paidCount = devicePayments.filter((p) => p.paid_date !== null).length;
      const outstanding = devicePayments
        .filter((p) => !p.paid_date)
        .reduce((s, p) => s + Number(p.amount), 0);
      return { device, plan, payments: devicePayments, paidCount, outstanding, today };
    });
  }, [customerDevices, plans, payments]);

  if (loading) {
    return (
      <AppLayout>
        <div className="text-[13.5px] text-slate">Loading…</div>
      </AppLayout>
    );
  }

  if (!customer) {
    return (
      <AppLayout>
        <div className="rounded-card border border-line p-6 text-[13.5px] text-slate">
          Customer not found. <Link to="/app/customers" className="text-emerald hover:underline">Back to customers</Link>
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

      <Link to="/app/customers" className="mb-4 inline-block text-[12.5px] text-slate hover:text-emerald">
        ← Back to customers
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-[24px] font-extrabold text-offwhite">{customer.full_name}</h1>
        {!editing && (
          <Button variant="secondary" size="sm" onClick={startEditing}>
            Edit details
          </Button>
        )}
      </div>

      <div className="mb-6 rounded-card border border-line p-6">
        {editing && form ? (
          <form onSubmit={handleSave} className="grid gap-4 md:grid-cols-3">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                required
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>City</label>
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="md:col-span-3">
              <label className={labelClass}>Complete Residential Address</label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>CNIC Number</label>
              <input
                pattern="\d{5}-\d{7}-\d{1}"
                title="Format: 42101-1234567-1"
                value={form.cnic_number}
                onChange={(e) => setForm({ ...form, cnic_number: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Guarantor Name</label>
              <input
                value={form.guarantor_name}
                onChange={(e) => setForm({ ...form, guarantor_name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Guarantor Phone</label>
              <input
                value={form.guarantor_phone}
                onChange={(e) => setForm({ ...form, guarantor_phone: e.target.value })}
                className={inputClass}
              />
            </div>

            {saveError && <div className="text-[13px] text-danger md:col-span-3">{saveError}</div>}
            <div className="flex gap-2 md:col-span-3">
              <Button type="submit" variant="primary" size="sm" disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </Button>
              <Button type="button" variant="ghost-dark" size="sm" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Phone" value={customer.phone} />
            <Field label="City" value={customer.city} />
            <Field label="CNIC Number" value={customer.cnic_number} mono />
            <Field label="Address" value={customer.address} className="sm:col-span-2 lg:col-span-3" />
            <Field
              label="Guarantor"
              value={
                customer.guarantor_name
                  ? `${customer.guarantor_name}${customer.guarantor_phone ? " · " + customer.guarantor_phone : ""}`
                  : null
              }
            />
            <div>
              <div className={labelClass}>ID Documents</div>
              {!customer.cnic_front_path && !customer.cnic_back_path ? (
                <span className="text-[13.5px] text-slate-light">None on file</span>
              ) : (
                <div className="flex gap-2">
                  {customer.cnic_front_path && (
                    <Button variant="ghost-dark" size="sm" disabled={viewingId === "front"} onClick={() => handleViewId("front")}>
                      View Front
                    </Button>
                  )}
                  {customer.cnic_back_path && (
                    <Button variant="ghost-dark" size="sm" disabled={viewingId === "back"} onClick={() => handleViewId("back")}>
                      View Back
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <h2 className="mb-4 font-heading text-[17px] font-extrabold text-offwhite">
        Financed devices ({customerDevices.length})
      </h2>

      {deviceLedgers.length === 0 ? (
        <div className="rounded-card border border-line p-6 text-[13.5px] text-slate">
          No devices financed for this customer yet.
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {deviceLedgers.map(({ device, plan, payments: devicePayments, paidCount, outstanding, today }) => (
            <div key={device.id} className="rounded-card border border-line p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <Link
                  to={`/app/devices/${device.id}`}
                  className="font-heading text-[15px] font-bold text-offwhite hover:text-emerald hover:underline"
                >
                  {device.device_label ?? "Device"}
                </Link>
                <div className="flex items-center gap-3 text-[12.5px] text-slate">
                  <span>
                    Sale price: <span className="font-mono text-offwhite">{formatPkr(device.sale_price ?? 0)}</span>
                  </span>
                  <span>
                    Paid: <span className="font-mono text-success">{paidCount} / {devicePayments.length}</span>
                  </span>
                  <span>
                    Outstanding: <span className="font-mono text-warning">{formatPkr(outstanding)}</span>
                  </span>
                </div>
              </div>

              {devicePayments.length === 0 ? (
                <div className="text-[13px] text-slate">No payment schedule found for this device.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[12.5px] text-slate">
                    <thead>
                      <tr className="border-b border-line text-[10.5px] uppercase tracking-wide text-slate/70">
                        <th className="pb-2 font-normal">Due Date</th>
                        <th className="pb-2 font-normal">Amount</th>
                        <th className="pb-2 font-normal">Status</th>
                        <th className="pb-2 font-normal">Paid Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devicePayments.map((p) => {
                        const overdue = !p.paid_date && p.due_date < today;
                        const status = p.paid_date ? "Paid" : overdue ? "Overdue" : "Active";
                        return (
                          <tr key={p.id} className="border-b border-line last:border-none">
                            <td className="py-2 font-mono">{p.due_date}</td>
                            <td className="py-2 font-mono">{formatPkr(Number(p.amount))}</td>
                            <td className="py-2">
                              <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium ${statusStyle[status]}`}>
                                {status}
                              </span>
                            </td>
                            <td className="py-2 font-mono">{p.paid_date ?? "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              {plan && (
                <div className="mt-3 text-[12px] text-slate">
                  Plan: {formatPkr(plan.installment_amount)} / {plan.frequency === "monthly" ? "mo" : "wk"}
                  {plan.due_day_of_month ? ` · due on day ${plan.due_day_of_month} each month` : ""} · status: {plan.status}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}

function Field({
  label,
  value,
  mono,
  className = "",
}: {
  label: string;
  value: string | null | undefined;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 font-mono text-[11.5px] uppercase tracking-wide text-slate">{label}</div>
      <div className={`text-[13.5px] text-offwhite ${mono ? "font-mono" : ""}`}>{value || "—"}</div>
    </div>
  );
}
