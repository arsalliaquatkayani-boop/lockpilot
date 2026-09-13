const steps = ["Capital Invested", "Phones Sold", "Payments Collected", "Receivable", "Profit"];

export function FinancialFlow() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center gap-3 md:flex-1 md:flex-row">
          <div className="w-full rounded-sm border border-line bg-white px-5 py-4 text-center md:flex-1">
            <span className="text-[14px] font-semibold text-navy">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <span className="text-slate-light md:mx-3">
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
