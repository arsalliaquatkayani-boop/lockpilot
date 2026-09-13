import { pricingPlan } from "../config/pricing";
import { Button } from "./Button";

export function PricingCard() {
  return (
    <div className="grid overflow-hidden rounded-card border border-line bg-white shadow-[0_30px_60px_-36px_rgba(11,31,51,0.2)] md:grid-cols-[1fr_auto]">
      <div className="p-10">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[36px] font-semibold text-navy">{pricingPlan.price}</span>
          <span className="text-[15px] text-slate-light">{pricingPlan.period}</span>
        </div>
        <p className="mt-2 mb-6 text-[14px] text-slate">
          Up to {pricingPlan.deviceCap} active devices.
        </p>
        <div className="flex flex-col gap-3">
          {pricingPlan.includes.map((item) => (
            <div key={item} className="flex items-center gap-3 text-[14.5px] text-navy">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-soft text-emerald-deep">
                <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5">
                  <path d="M3 6.5l2 2L9 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </div>
          ))}
        </div>
        <p className="mt-6 text-[12.5px] text-slate-light">{pricingPlan.note}</p>
      </div>
      <div className="flex items-center bg-offwhite p-10">
        <Button to="/early-access" variant="primary">
          Request Early Access
        </Button>
      </div>
    </div>
  );
}
