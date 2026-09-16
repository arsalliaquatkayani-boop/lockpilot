import { useMemo, useState } from "react";

type Status = "Active" | "Due Soon" | "Overdue" | "Locked" | "Paid";

type DeviceRow = {
  customer: string;
  city: string;
  device: string;
  salePrice: number;
  paid: number;
  nextPayment: string;
  status: Status;
  location: string;
};

// Demo data only — fictional names and figures, not real customers.
const demoRows: DeviceRow[] = [
  { customer: "Ahmed Raza", city: "Karachi", device: "Samsung A54", salePrice: 68000, paid: 36500, nextPayment: "18 Sep", status: "Active", location: "Karachi" },
  { customer: "Bilal Hussain", city: "Lahore", device: "Infinix Note 30", salePrice: 42000, paid: 32800, nextPayment: "14 Sep", status: "Due Soon", location: "Lahore" },
  { customer: "Sana Malik", city: "Rawalpindi", device: "Vivo Y28", salePrice: 39000, paid: 21000, nextPayment: "9 Sep (overdue)", status: "Overdue", location: "Rawalpindi" },
  { customer: "Usman Tariq", city: "Islamabad", device: "Redmi Note 13", salePrice: 45000, paid: 18000, nextPayment: "6 Sep (overdue)", status: "Locked", location: "Islamabad" },
  { customer: "Fatima Noor", city: "Lahore", device: "Samsung A34", salePrice: 71000, paid: 71000, nextPayment: "—", status: "Paid", location: "Lahore" },
  { customer: "Hamza Sheikh", city: "Karachi", device: "Infinix Hot 40", salePrice: 34000, paid: 22000, nextPayment: "20 Sep", status: "Active", location: "Karachi" },
  { customer: "Ayesha Farooq", city: "Faisalabad", device: "Vivo Y17s", salePrice: 31000, paid: 9000, nextPayment: "5 Sep (overdue)", status: "Overdue", location: "Faisalabad" },
  { customer: "Zainab Iqbal", city: "Karachi", device: "Samsung A15", salePrice: 52000, paid: 40000, nextPayment: "16 Sep", status: "Due Soon", location: "Karachi" },
];

const statusStyle: Record<Status, string> = {
  Active: "bg-success-soft text-success",
  "Due Soon": "bg-warning-soft text-warning",
  Overdue: "bg-danger-soft text-danger",
  Locked: "border border-danger text-danger",
  Paid: "bg-line/60 text-slate",
};

const filters: Array<"All" | Status> = ["All", "Active", "Due Soon", "Overdue", "Locked", "Paid"];

export function DeviceTable() {
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    return demoRows.filter((r) => {
      const matchesFilter = filter === "All" || r.status === filter;
      const matchesQuery =
        query.trim() === "" ||
        r.customer.toLowerCase().includes(query.toLowerCase()) ||
        r.device.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="rounded-card border border-line-dark overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-line-dark p-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search customer or device…"
          className="rounded-sm border border-line-dark bg-white px-3 py-2 text-[13.5px] text-offwhite placeholder:text-slate-light focus:outline-none focus:border-emerald"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-pill px-3 py-1.5 text-[11.5px] transition-colors ${
                filter === f ? "bg-emerald text-white" : "bg-navy text-slate-light hover:text-offwhite"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-[13.5px] text-slate-light">
          <thead>
            <tr className="border-b border-line-dark text-[11px] uppercase tracking-wide text-slate-light/70">
              <th className="px-4 py-3 font-normal">Customer</th>
              <th className="px-4 py-3 font-normal">Device</th>
              <th className="px-4 py-3 font-normal">Sale Price</th>
              <th className="px-4 py-3 font-normal">Paid</th>
              <th className="px-4 py-3 font-normal">Remaining</th>
              <th className="px-4 py-3 font-normal">Next Payment</th>
              <th className="px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.customer} className="border-b border-line-dark last:border-none">
                <td className="px-4 py-3 text-offwhite">{r.customer}</td>
                <td className="px-4 py-3">{r.device}</td>
                <td className="px-4 py-3 font-mono">Rs {r.salePrice.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono">Rs {r.paid.toLocaleString()}</td>
                <td className="px-4 py-3 font-mono">Rs {(r.salePrice - r.paid).toLocaleString()}</td>
                <td className="px-4 py-3">{r.nextPayment}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-pill px-2.5 py-1 font-mono text-[11px] ${statusStyle[r.status]}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-light">
                  No devices match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-line-dark">
        {rows.map((r) => (
          <div key={r.customer} className="p-4 text-[13.5px]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-offwhite">{r.customer}</span>
              <span className={`rounded-pill px-2.5 py-1 font-mono text-[11px] ${statusStyle[r.status]}`}>
                {r.status}
              </span>
            </div>
            <div className="text-slate-light">{r.device} · {r.city}</div>
            <div className="mt-2 flex justify-between font-mono text-slate-light">
              <span>Paid Rs {r.paid.toLocaleString()}</span>
              <span>Remaining Rs {(r.salePrice - r.paid).toLocaleString()}</span>
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div className="p-8 text-center text-slate-light">No devices match this search.</div>
        )}
      </div>
    </div>
  );
}

export { demoRows };
export type { DeviceRow, Status };
