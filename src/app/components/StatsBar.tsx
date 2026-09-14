import type { Device, Payment } from "../../lib/types";

function formatPkr(amount: number) {
  return `Rs ${Math.round(amount).toLocaleString("en-PK")}`;
}

export function StatsBar({ devices, payments }: { devices: Device[]; payments: Payment[] }) {
  const totalDevices = devices.length;
  const lockedDevices = devices.filter((d) => d.status === "locked").length;
  const activeDevices = devices.filter((d) => d.status === "active").length;

  const collected = payments
    .filter((p) => p.paid_date !== null)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const today = new Date().toISOString().slice(0, 10);
  const overdue = payments
    .filter((p) => p.paid_date === null && p.due_date < today)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const outstanding = payments
    .filter((p) => p.paid_date === null)
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const stats: { label: string; value: string; tone?: "positive" | "danger" }[] = [
    { label: "Total Devices", value: String(totalDevices) },
    { label: "Active", value: String(activeDevices) },
    { label: "Locked", value: String(lockedDevices), tone: lockedDevices > 0 ? "danger" : undefined },
    { label: "Collected", value: formatPkr(collected), tone: "positive" },
    { label: "Outstanding", value: formatPkr(outstanding) },
    { label: "Overdue", value: formatPkr(overdue), tone: overdue > 0 ? "danger" : undefined },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line-dark bg-line-dark md:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <div key={s.label} className="bg-navy-deep p-4">
          <div className="mb-1 text-[12px] text-slate-light">{s.label}</div>
          <div
            className={`text-[18px] font-semibold ${
              s.tone === "positive" ? "text-emerald" : s.tone === "danger" ? "text-danger" : "text-white"
            }`}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
