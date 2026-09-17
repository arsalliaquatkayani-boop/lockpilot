import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "../components/AdminLayout";
import { Button } from "../../components/Button";
import { useAdminShops } from "../lib/useAdminShops";

const billingStyle: Record<string, string> = {
  active: "bg-success-soft text-success",
  overdue: "bg-warning-soft text-warning",
  suspended: "bg-danger-soft text-danger",
};

const planStyle: Record<string, string> = {
  trial: "bg-line/60 text-slate",
  basic: "bg-emerald-soft text-emerald-deep",
  pro: "bg-navy text-offwhite",
};

export function AdminShops() {
  const { shops, loading, error } = useAdminShops();
  const [query, setQuery] = useState("");

  const filtered = shops.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      (s.phone ?? "").includes(query),
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-[24px] font-extrabold text-offwhite">All shops</h1>
        <Button to="/admin/shops/new" variant="primary" size="sm">
          + Add shop
        </Button>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by shop name or phone…"
        className="mb-5 w-full max-w-[320px] rounded-sm border border-line bg-navy px-3 py-2.5 text-[13.5px] text-offwhite outline-none placeholder:text-slate-light focus:border-emerald"
      />

      {error && (
        <div className="mb-6 rounded-sm border border-danger/40 bg-danger-soft px-4 py-3 text-[13.5px] text-danger">
          {error}
        </div>
      )}

      <div className="rounded-card border border-line-dark p-5">
        {loading ? (
          <div className="text-[13.5px] text-slate">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="text-[13.5px] text-slate">No shops match your search.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] text-slate">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wide text-slate/70">
                  <th className="pb-2.5 font-normal">Shop</th>
                  <th className="pb-2.5 font-normal">Phone</th>
                  <th className="pb-2.5 font-normal">Plan</th>
                  <th className="pb-2.5 font-normal">Billing</th>
                  <th className="pb-2.5 font-normal">Next payment due</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    className="cursor-pointer border-b border-line last:border-none hover:bg-navy"
                    onClick={() => (window.location.href = `/admin/shops/${s.id}`)}
                  >
                    <td className="py-2.5 font-medium text-offwhite">
                      <Link to={`/admin/shops/${s.id}`}>{s.name}</Link>
                    </td>
                    <td className="py-2.5 font-mono">{s.phone ?? "—"}</td>
                    <td className="py-2.5">
                      <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium capitalize ${planStyle[s.plan]}`}>
                        {s.plan}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium capitalize ${billingStyle[s.billing_status]}`}>
                        {s.billing_status}
                      </span>
                    </td>
                    <td className="py-2.5">{s.next_payment_due ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
