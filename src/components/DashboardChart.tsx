import { useEffect, useRef, useState } from "react";

// Demo data only — illustrative, not real collections figures.
const demoMonths = [
  { label: "Apr", collected: 62, overdue: 8 },
  { label: "May", collected: 71, overdue: 11 },
  { label: "Jun", collected: 68, overdue: 14 },
  { label: "Jul", collected: 79, overdue: 9 },
  { label: "Aug", collected: 88, overdue: 12 },
  { label: "Sep", collected: 94, overdue: 7 },
];

export function DashboardChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const max = 100;

  return (
    <div ref={ref} className="rounded-card border border-line-dark p-5">
      <div className="mb-4 flex items-center justify-between text-[12px] text-slate-light">
        <span>Collected vs. overdue (demo data)</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald" /> Collected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400" /> Overdue
          </span>
        </div>
      </div>
      <div className="flex items-end gap-4 h-[140px]">
        {demoMonths.map((m) => (
          <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-end justify-center gap-1 h-[110px]">
              <div
                className="w-3 rounded-t-sm bg-emerald transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ height: animate ? `${(m.collected / max) * 100}%` : "0%" }}
              />
              <div
                className="w-3 rounded-t-sm bg-red-400/80 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ height: animate ? `${(m.overdue / max) * 100}%` : "0%" }}
              />
            </div>
            <span className="font-mono text-[11px] text-slate-light">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
