import { useEffect, useState, type FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/Button";
import { supabase } from "../../lib/supabase";
import type { AdminShopStats, Shop, Staff } from "../../lib/types";

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[14px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-slate";

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-card border border-line-dark p-4">
      <div className="mb-1.5 text-[12px] text-slate">{label}</div>
      <div className="font-heading text-[20px] font-extrabold tabular-nums text-offwhite">{value}</div>
    </div>
  );
}

export function AdminShopDetail() {
  const { id } = useParams<{ id: string }>();
  const [shop, setShop] = useState<Shop | null>(null);
  const [staffRows, setStaffRows] = useState<Staff[]>([]);
  const [stats, setStats] = useState<AdminShopStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [plan, setPlan] = useState<Shop["plan"]>("trial");
  const [billingStatus, setBillingStatus] = useState<Shop["billing_status"]>("active");
  const [nextPaymentDue, setNextPaymentDue] = useState("");
  const [lastPaymentDate, setLastPaymentDate] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const [{ data: shopRow, error: shopError }, { data: staffData }, { data: statsData }] = await Promise.all([
        supabase.from("shops").select("*").eq("id", id).single(),
        supabase.from("staff").select("*").eq("shop_id", id),
        supabase.rpc("admin_shop_stats", { target_shop_id: id }).single(),
      ]);

      if (shopError || !shopRow) {
        setError("Shop not found.");
        setLoading(false);
        return;
      }

      setShop(shopRow);
      setPlan(shopRow.plan);
      setBillingStatus(shopRow.billing_status);
      setNextPaymentDue(shopRow.next_payment_due ?? "");
      setLastPaymentDate(shopRow.last_payment_date ?? "");
      setStaffRows(staffData ?? []);
      setStats((statsData as AdminShopStats) ?? null);
      setLoading(false);
    })();
  }, [id]);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setSaved(false);
    setError(null);

    const { error: updateError } = await supabase
      .from("shops")
      .update({
        plan,
        billing_status: billingStatus,
        next_payment_due: nextPaymentDue || null,
        last_payment_date: lastPaymentDate || null,
      })
      .eq("id", id);

    setSaving(false);
    if (updateError) setError(updateError.message);
    else setSaved(true);
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-[13.5px] text-slate">Loading…</div>
      </AdminLayout>
    );
  }

  if (!shop) {
    return (
      <AdminLayout>
        <div className="rounded-sm border border-danger/40 bg-danger-soft px-4 py-3 text-[13.5px] text-danger">
          {error ?? "Shop not found."}
        </div>
      </AdminLayout>
    );
  }

  const owner = staffRows.find((s) => s.role === "owner");

  return (
    <AdminLayout>
      <Link to="/admin/shops" className="mb-4 inline-block text-[12.5px] text-emerald hover:underline">
        ← All shops
      </Link>

      <h1 className="mb-1 font-heading text-[24px] font-extrabold text-offwhite">{shop.name}</h1>
      <p className="mb-6 text-[13.5px] text-slate">{shop.phone ?? "No phone on file"}</p>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatBox label="Customers" value={stats?.customers_count ?? 0} />
        <StatBox label="Devices" value={stats?.devices_count ?? 0} />
        <StatBox label="Active plans" value={stats?.active_plans_count ?? 0} />
        <StatBox label="Locked devices" value={stats?.locked_devices_count ?? 0} />
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-card border border-line-dark p-5">
          <h2 className="mb-4 font-heading text-[14.5px] font-bold text-offwhite">Owner</h2>
          {owner ? (
            <div className="text-[13.5px] text-slate">
              <div className="text-offwhite">{owner.full_name ?? "—"}</div>
              <div className="font-mono">{owner.email ?? "—"}</div>
            </div>
          ) : (
            <div className="text-[13.5px] text-slate">
              Invite not yet accepted — no owner account linked.
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="rounded-card border border-line-dark p-5">
          <h2 className="mb-4 font-heading text-[14.5px] font-bold text-offwhite">Plan & billing</h2>

          <div className="mb-3">
            <label className={labelClass}>Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as Shop["plan"])}
              className={inputClass}
            >
              <option value="trial">Trial</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
            </select>
          </div>

          <div className="mb-3">
            <label className={labelClass}>Billing status</label>
            <select
              value={billingStatus}
              onChange={(e) => setBillingStatus(e.target.value as Shop["billing_status"])}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="overdue">Overdue</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="mb-3">
            <label className={labelClass}>Last payment date</label>
            <input
              type="date"
              value={lastPaymentDate}
              onChange={(e) => setLastPaymentDate(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="mb-4">
            <label className={labelClass}>Next payment due</label>
            <input
              type="date"
              value={nextPaymentDue}
              onChange={(e) => setNextPaymentDue(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && (
            <div className="mb-3 rounded-sm border border-danger/40 bg-danger-soft px-3 py-2 text-[13px] text-danger">
              {error}
            </div>
          )}
          {saved && (
            <div className="mb-3 rounded-sm border border-emerald/30 bg-emerald-soft px-3 py-2 text-[13px] text-emerald">
              Saved.
            </div>
          )}

          <Button type="submit" variant="primary" disabled={saving} className="w-full">
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}
