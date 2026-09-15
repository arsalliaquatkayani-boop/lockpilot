import { pricingTiers, pricingNote } from "../config/pricing";
import { Button } from "./Button";

export function PricingCard() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col rounded-card border p-8 transition-all duration-300 ${
              tier.highlight
                ? "border-emerald bg-navy-secondary shadow-[0_30px_60px_-25px_rgba(217,164,65,0.35)] md:-translate-y-3"
                : "border-line bg-navy-secondary/40 hover:-translate-y-1 hover:border-emerald/40"
            }`}
          >
            {tier.highlight && (
              <span className="mb-4 inline-block w-fit rounded-pill bg-emerald px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-navy-deep">
                Most popular
              </span>
            )}
            <h3 className="mb-1 font-heading text-[18px] font-bold text-offwhite">
              {tier.name}
            </h3>
            <div className="mb-6 flex items-baseline gap-1.5">
              <span className="font-mono text-[28px] font-semibold tabular-nums text-offwhite">
                {tier.price}
              </span>
              <span className="text-[13.5px] text-slate-light">
                {tier.period}
              </span>
            </div>
            <div className="mb-8 flex flex-1 flex-col gap-3">
              {tier.includes.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-[14px] text-slate">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                    <svg viewBox="0 0 24 24" fill="none" className="h-2 w-2">
                      <path d="M3 6.5l2 2L9 4" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <Button to="/early-access" variant={tier.highlight ? "primary" : "ghost"} className="w-full">
              Request Early Access
            </Button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-[12.5px] text-slate-light">{pricingNote}</p>
    </div>
  );
}
