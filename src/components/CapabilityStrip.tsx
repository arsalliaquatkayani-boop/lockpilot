const capabilities = [
  {
    label: "Automated Device Control",
    icon: (
      <path d="M6 11V8a3.5 3.5 0 0 1 7 0v3M5 11h9v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "Payment Visibility",
    icon: (
      <path d="M3 4h13v13H3zM6 8h7M6 11h7M6 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    ),
  },
  {
    label: "Location Awareness",
    icon: (
      <path d="M10 17s5-4.7 5-8.7A5 5 0 0 0 5 8.3C5 12.3 10 17 10 17z M10 9.4a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    ),
  },
  {
    label: "Manual Override",
    icon: (
      <path d="M5 9V7a3 3 0 0 1 5.6-1.4M4 9h10v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    label: "Auditable Events",
    icon: (
      <path d="M5 3h8a1 1 0 0 1 1 1v13l-5-2.5L4 17V4a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    ),
  },
];

export function CapabilityStrip() {
  return (
    <div className="grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-5">
      {capabilities.map((c) => (
        <div key={c.label} className="flex flex-col items-center gap-2.5 text-center">
          <svg viewBox="0 0 20 20" fill="none" className="h-6 w-6 text-emerald-deep">
            {c.icon}
          </svg>
          <span className="text-[13px] font-medium text-navy">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
