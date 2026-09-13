import { useEffect, useState } from "react";
import { PhoneMockup } from "./PhoneMockup";

export function LockDemo() {
  const [locked, setLocked] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setLocked((v) => !v);
        setFading(false);
      }, 220);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <PhoneMockup screenClassName={locked ? "bg-navy-deep" : "bg-navy"}>
      <div
        className={`flex flex-col items-center gap-3 text-white transition-opacity duration-200 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="font-mono text-[11px] tracking-[0.15em] text-white/50">LOCKPILOT</span>

        {locked ? (
          <>
            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div className="font-heading font-bold text-[17px]">DEVICE LOCKED</div>
            <p className="max-w-[190px] text-[12.5px] leading-relaxed text-white/65">
              Installment payment overdue. Please contact:
            </p>
            <div className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-[12.5px]">
              <div className="font-semibold">Demo Mobile Store</div>
              <div className="font-mono text-white/50">Demo Contact</div>
            </div>
            <p className="max-w-[190px] text-[11.5px] text-white/45">
              Payment received? Your device will unlock automatically.
            </p>
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 11V9a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div className="font-heading font-bold text-[17px]">DEVICE ACTIVE</div>
            <p className="max-w-[190px] text-[12.5px] leading-relaxed text-white/65">
              Installment plan up to date.
            </p>
          </>
        )}
      </div>
    </PhoneMockup>
  );
}
