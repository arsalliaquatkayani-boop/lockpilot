import { useState, type FormEvent } from "react";
import { supabase } from "../../lib/supabase";
import type { Customer } from "../../lib/types";
import { useAuth } from "../../context/AuthContext";

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
    <div className="rounded-card border border-line-dark bg-navy-deep p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-white">Customers</h2>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="rounded-sm border border-white/25 px-3 py-1.5 text-[13px] text-white hover:border-white/60"
        >
          {showForm ? "Cancel" : "Add customer"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-5 grid gap-3 border-b border-line-dark pb-5 md:grid-cols-3">
          <input
            required
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-sm border border-line-dark bg-navy px-3 py-2 text-[13.5px] text-white outline-none focus:border-emerald"
          />
          {error && <div className="text-[13px] text-danger md:col-span-3">{error}</div>}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-sm bg-emerald px-4 py-2 text-[13.5px] font-semibold text-white hover:bg-emerald-deep disabled:opacity-60 md:col-span-3 md:w-fit"
          >
            {submitting ? "Saving…" : "Save customer"}
          </button>
        </form>
      )}

      {customers.length === 0 ? (
        <div className="text-[13.5px] text-slate-light">No customers yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="text-left text-slate-light">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Phone</th>
                <th className="pb-2 font-medium">City</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t border-line-dark text-white">
                  <td className="py-2">{c.full_name}</td>
                  <td className="py-2 text-slate-light">{c.phone ?? "—"}</td>
                  <td className="py-2 text-slate-light">{c.city ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
