type Tone = "neutral" | "positive" | "warning" | "danger";

const toneClass: Record<Tone, string> = {
  neutral: "text-white",
  positive: "text-emerald",
  warning: "text-amber-400",
  danger: "text-red-400",
};

export function DashboardCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: Tone;
}) {
  return (
    <div className="bg-navy-secondary px-5 py-5">
      <div className="mb-2 text-[12px] text-slate-light">{label}</div>
      <div className={`font-mono text-[21px] ${toneClass[tone]}`}>{value}</div>
    </div>
  );
}
