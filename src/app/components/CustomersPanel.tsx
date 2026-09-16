import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer } from "../../lib/types";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/Button";

const inputClass =
  "w-full rounded-sm border border-line bg-navy px-3 py-2.5 text-[13.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald";
const labelClass = "mb-1.5 block font-mono text-[11.5px] uppercase tracking-wide text-slate";

export function CustomersPanel({
  customers,
  onChanged,
}: {
  customers: Customer[];
  onChanged: () => void;
}) {
  const { shop } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!shop) return;
    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase.from("customers").insert({
      shop_id: shop.id,
      full_name: fullName,
      phone: phone || null,
      city: city || null,
    });

    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }

    setFullName("");
    setPhone("");
    setCity("");
    setShowForm(false);
    onChanged();
  }

  return (
    <div className="rounded-card border border-line bg-navy-secondary p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-[17px] font-extrabold text-offwhite">Customers</h2>
        <Button variant={showForm ? "ghost-dark" : "secondary"} size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "Add customer"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 grid gap-4 border-b border-line pb-6 md:grid-cols-3">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
          </div>
          {error && <div className="text-[13px] text-danger md:col-span-3">{error}</div>}
          <div className="md:col-span-3">
            <Button type="submit" variant="primary" size="sm" disabled={submitting}>
              {submitting ? "Saving…" : "Save customer"}
            </Button>
          </div>
        </form>
      )}

      {customers.length === 0 ? (
        <div className="text-[13.5px] text-slate">No customers yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px] text-slate">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                <th className="pb-3 font-normal">Name</th>
                <th className="pb-3 font-normal">Phone</th>
                <th className="pb-3 font-normal">City</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-line last:border-none">
                  <td className="py-3 text-offwhite">{c.full_name}</td>
                  <td className="py-3">{c.phone ?? "—"}</td>
                  <td className="py-3">{c.city ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
