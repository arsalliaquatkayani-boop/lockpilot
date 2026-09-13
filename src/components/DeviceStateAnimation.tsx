import { useEffect, useState, type ReactElement } from "react";
import { PhoneMockup } from "./PhoneMockup";

type DeviceState = {
  key: string;
  label: string;
  chipClass: string;
  screenClass: string;
  title: string;
  sub: string;
  icon: ReactIconKey;
};

type ReactIconKey = "check" | "clock" | "lock" | "checkCircle" | "unlock";

const icons: Record<ReactIconKey, ReactElement> = {
  check: (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12.3l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  checkCircle: (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 12.3l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  unlock: (
    <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V9a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

const states: DeviceState[] = [
  {
    key: "active",
    label: "ACTIVE",
    chipClass: "bg-emerald-soft text-emerald-deep",
    screenClass: "bg-navy",
    title: "Device active",
    sub: "Installment plan up to date (demo data)",
    icon: "check",
  },
  {
    key: "overdue",
    label: "OVERDUE",
    chipClass: "bg-amber-100 text-amber-700",
    screenClass: "bg-navy-secondary",
    title: "Payment overdue",
    sub: "Grace period has ended (demo data)",
    icon: "clock",
  },
  {
    key: "locked",
    label: "LOCKED",
    chipClass: "bg-danger-soft text-danger",
    screenClass: "bg-navy-deep",
    title: "Device locked",
    sub: "Please contact Demo Mobile Store",
    icon: "lock",
  },
  {
    key: "received",
    label: "PAYMENT RECEIVED",
    chipClass: "bg-emerald-soft text-emerald-deep",
    screenClass: "bg-navy-secondary",
    title: "Payment received",
    sub: "Device will unlock automatically",
    icon: "checkCircle",
  },
  {
    key: "restored",
    label: "RESTORED",
    chipClass: "bg-emerald-soft text-emerald-deep",
    screenClass: "bg-navy",
    title: "Device restored",
    sub: "Back to normal, unrestricted state",
    icon: "unlock",
  },
];

export function DeviceStateAnimation() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % states.length);
        setFading(false);
      }, 220);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const current = states[index];

  return (
    <div className="flex flex-col items-center gap-8">
      <PhoneMockup screenClassName={current.screenClass}>
        <div
          className={`flex flex-col items-center gap-3 text-white transition-opacity duration-200 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          {icons[current.icon]}
          <div className="font-heading font-bold text-[16px]">{current.title}</div>
          <div className="max-w-[180px] text-[12.5px] leading-relaxed text-white/65">{current.sub}</div>
        </div>
      </PhoneMockup>

      <div className="flex items-center gap-2">
        {states.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <span
              className={`rounded-pill px-3 py-1 font-mono text-[11px] uppercase tracking-wide transition-colors duration-300 ${
                i === index ? s.chipClass : "bg-line/60 text-slate-light"
              }`}
            >
              {s.label}
            </span>
            {i < states.length - 1 && <span className="text-slate-light">→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
