import { useEffect, useState } from "react";

/**
 * The hero's signature visual — a literal lock mechanism instead of a stock
 * photo, matching "The Vault" design direction. Cycles between locked and
 * unlocked to show the product's actual behavior, not just a static badge.
 */
export function LockMechanism() {
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setLocked((v) => !v), 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-[300px] w-[300px] items-center justify-center sm:h-[340px] sm:w-[340px]">
      <div className="absolute inset-0 rounded-full border border-line" />
      <div className="absolute inset-[26px] rounded-full border border-dashed border-emerald/30" />
      <div
        className="pointer-events-none absolute h-[220px] w-[220px] rounded-full bg-emerald/10 blur-[50px] transition-opacity duration-700"
        style={{ opacity: locked ? 0.5 : 1 }}
      />

      <div className="relative">
        <div
          className="mx-auto h-[60px] w-[66px] rounded-t-[40px] border-[10px] border-b-0 border-emerald transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: locked ? "translateY(0) rotate(0deg)" : "translateY(-6px) rotate(-14deg)",
            transformOrigin: "right bottom",
          }}
        />
        <div className="relative h-[108px] w-[128px] rounded-[14px] border border-line bg-gradient-to-br from-navy-secondary to-navy-deep shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
          <div className="absolute inset-x-0 top-0 h-px bg-white/5" />
          <div className="flex h-full flex-col items-center justify-center gap-1.5">
            <div
              className="h-4 w-4 rounded-full transition-colors duration-500"
              style={{ background: locked ? "#D9A441" : "#8A7C64" }}
            />
            <div
              className="h-3.5 w-1.5 transition-colors duration-500"
              style={{
                background: locked ? "#D9A441" : "#8A7C64",
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
              }}
            />
          </div>
        </div>

        <div
          className={`absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill px-4 py-1.5 font-mono text-[11px] tracking-[0.04em] transition-colors duration-500 ${
            locked ? "bg-emerald-bright text-navy-deep" : "bg-navy-secondary text-emerald border border-emerald/40"
          }`}
        >
          {locked ? "STATUS: LOCKED" : "STATUS: ACTIVE"}
        </div>
      </div>
    </div>
  );
}
