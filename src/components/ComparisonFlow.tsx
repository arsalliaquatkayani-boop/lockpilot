const without = ["Manual payment chasing", "Unclear receivables", "Device uncertainty", "Scattered records", "Repeated follow-ups"];
const withLockPilot = ["Automated enforcement", "Payment visibility", "Device status", "Centralized records", "Financial insight"];

export function ComparisonFlow() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-card border border-line bg-navy/60 p-8 opacity-80">
        <div className="mb-5 text-[12px] uppercase tracking-wide text-slate">Without LockPilot</div>
        <div className="flex flex-col gap-2.5">
          {without.map((item) => (
            <div key={item} className="rounded-sm border border-line bg-white px-4 py-3 text-[14.5px] font-medium text-slate">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-card border border-emerald/40 bg-navy-secondary p-8 shadow-[0_20px_50px_-25px_rgba(33,116,255,0.2)]">
        <div className="mb-5 text-[12px] uppercase tracking-wide text-emerald">With LockPilot</div>
        <div className="flex flex-col gap-2.5">
          {withLockPilot.map((item) => (
            <div key={item} className="rounded-sm border border-line bg-emerald-soft/60 px-4 py-3 text-[14.5px] font-medium text-offwhite">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
