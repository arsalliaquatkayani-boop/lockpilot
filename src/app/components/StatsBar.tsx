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
    <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-card border bg-navy-secondary p-4 ${
            s.tone === "danger" ? "border-danger/40" : "border-line"
          }`}
        >
          <div className="mb-1.5 font-mono text-[10.5px] uppercase tracking-wide text-slate">
            {s.label}
          </div>
          <div
            className={`font-heading text-[20px] font-extrabold tabular-nums ${
              s.tone === "positive" ? "text-emerald-bright" : s.tone === "danger" ? "text-danger" : "text-offwhite"
            }`}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>
  );
}
