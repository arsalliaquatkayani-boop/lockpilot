import { useEffect, useState, type FormEvent } from "react";
import { AppLayout } from "../components/AppLayout";
import { Button } from "../../components/Button";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { useShopData } from "../lib/useShopData";

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[13.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11.5px] uppercase tracking-wide text-slate";

export function SettingsPage() {
  const { shop, staff } = useAuth();
  const { staff: allStaff, loading } = useShopData();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gracePeriod, setGracePeriod] = useState("3");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (shop) {
      setName(shop.name ?? "");
      setPhone(shop.phone ?? "");
      setAddress(shop.address ?? "");
      setGracePeriod(String(shop.grace_period_days ?? 3));
    }
  }, [shop]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!shop) return;
    setSaving(true);
    setError(null);
    setSaved(false);

    const { error: updateError } = await supabase
      .from("shops")
      .update({
        name,
        phone: phone || null,
        address: address || null,
        grace_period_days: Number(gracePeriod),
      })
      .eq("id", shop.id);

    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSaved(true);
  }

  return (
    <AppLayout>
      <h1 className="mb-6 font-heading text-[24px] font-extrabold text-offwhite">Settings</h1>

      <div className="mb-6 rounded-card border border-line p-6">
        <h2 className="mb-5 font-heading text-[16px] font-bold text-offwhite">Shop details</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass}>Shop Name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Grace Period (days)</label>
            <input
              type="number"
              min="0"
              value={gracePeriod}
              onChange={(e) => setGracePeriod(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1.5 text-[12px] text-slate">
              How many days after a due date before a payment is treated as overdue.
            </p>
          </div>

          {error && <div className="text-[13px] text-danger md:col-span-2">{error}</div>}
          {saved && !error && <div className="text-[13px] text-success md:col-span-2">Saved.</div>}

          <div className="md:col-span-2">
            <Button type="submit" variant="primary" size="sm" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </div>

      <div className="rounded-card border border-line p-6">
        <h2 className="mb-5 font-heading text-[16px] font-bold text-offwhite">Team</h2>
        {loading ? (
          <div className="text-[13.5px] text-slate">Loading…</div>
        ) : (
          <div className="flex flex-col gap-3">
            {allStaff.map((member) => (
              <div key={member.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-soft text-[11px] font-bold text-emerald-deep">
                    {(member.full_name ?? "?")
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </span>
                  <span className="text-[13.5px] text-offwhite">
                    {member.full_name ?? "Unnamed"}
                    {member.id === staff?.id && <span className="text-slate"> (you)</span>}
                  </span>
                </div>
                <span className="rounded-pill bg-line/60 px-2.5 py-1 text-[11px] font-medium capitalize text-slate">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
