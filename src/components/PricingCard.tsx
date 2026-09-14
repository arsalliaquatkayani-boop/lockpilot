import { pricingTiers, pricingNote } from "../config/pricing";
import { Button } from "./Button";

export function PricingCard() {
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-3">
        {pricingTiers.map((tier) => (
          <div
            key={tier.id}
            className={`flex flex-col rounded-card border p-8 ${
              tier.highlight
                ? "border-navy bg-navy text-white shadow-[0_30px_60px_-36px_rgba(17,17,19,0.35)] md:-translate-y-3"
                : "border-line bg-white"
            }`}
          >
            {tier.highlight && (
              <span className="mb-4 inline-block w-fit rounded-pill bg-emerald px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-white">
                Most popular
              </span>
            )}
            <h3 className={`mb-1 font-heading text-[18px] font-bold ${tier.highlight ? "text-white" : "text-navy"}`}>
              {tier.name}
            </h3>
            <div className="mb-6 flex items-baseline gap-1.5">
              <span className={`font-mono text-[28px] font-semibold ${tier.highlight ? "text-white" : "text-navy"}`}>
                {tier.price}
              </span>
              <span className={tier.highlight ? "text-white/50 text-[13.5px]" : "text-slate-light text-[13.5px]"}>
                {tier.period}
              </span>
            </div>
            <div className="mb-8 flex flex-1 flex-col gap-3">
              {tier.includes.map((item) => (
                <div
                  key={item}
                  className={`flex items-start gap-2.5 text-[14px] ${
                    tier.highlight ? "text-white/85" : "text-navy"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                      tier.highlight ? "bg-white/15 text-white" : "bg-emerald-soft text-emerald-deep"
                    }`}
                  >
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
