const without = ["Manual payment chasing", "Unclear receivables", "Device uncertainty", "Scattered records", "Repeated follow-ups"];
const withLockPilot = ["Automated enforcement", "Payment visibility", "Device status", "Centralized records", "Financial insight"];

export function ComparisonFlow() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-card border border-line bg-offwhite p-8">
        <div className="mb-5 font-mono text-[12px] uppercase tracking-wide text-slate">Without LockPilot</div>
        <div className="flex flex-col gap-2.5">
          {without.map((item) => (
            <div key={item} className="rounded-sm border border-line bg-white px-4 py-3 text-[14.5px] font-medium text-navy">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-card bg-navy p-8">
        <div className="mb-5 font-mono text-[12px] uppercase tracking-wide text-emerald">With LockPilot</div>
        <div className="flex flex-col gap-2.5">
          {withLockPilot.map((item) => (
            <div key={item} className="rounded-sm border border-line-dark bg-white/5 px-4 py-3 text-[14.5px] font-medium text-white">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
