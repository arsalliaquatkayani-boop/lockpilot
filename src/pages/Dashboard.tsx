import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { DeviceTable } from "../components/DeviceTable";
import { FinancialFlow } from "../components/FinancialFlow";
import { brand } from "../config/brand";

const iconProps = { viewBox: "0 0 24 24", fill: "none", className: "h-[18px] w-[18px]" };

const sidebarItems = [
  {
    label: "Overview",
    active: true,
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Customers",
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="8.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15.5 13.2c2.4.2 4 1.9 4 4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Devices",
    icon: (
      <svg {...iconProps}>
        <rect x="6.5" y="3" width="11" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 18h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Payments",
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 14.2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const stats = [
  {
    label: "Total customers",
    value: "1,284",
    delta: "+12.8%",
    tone: "positive" as const,
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Active installments",
    value: "842",
    delta: "+8.4%",
    tone: "positive" as const,
    icon: (
      <svg {...iconProps}>
        <rect x="3.5" y="6" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    label: "Outstanding amount",
    value: "Rs 8.42M",
    delta: "-4.6%",
    tone: "warning" as const,
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v18 M17 7.5c0-1.7-2.2-3-5-3s-5 1.3-5 3 2.2 3 5 3 5 1.3 5 3-2.2 3-5 3-5-1.3-5-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Overdue payments",
    value: "24",
    delta: "Needs attention",
    tone: "danger" as const,
    icon: (
      <svg {...iconProps}>
        <path d="M12 4a5 5 0 0 0-5 5v3.2l-1.4 2.8h12.8L17 12.2V9a5 5 0 0 0-5-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const chartMonths = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const collectedSeries = [62, 71, 68, 79, 88, 94];
const expectedSeries = [70, 74, 80, 84, 90, 96];

function toPoints(values: number[], w: number, h: number) {
  const max = 100;
  return values
    .map((v, i) => `${(i / (values.length - 1)) * w},${h - (v / max) * h}`)
    .join(" ");
}

const upcomingPayments = [
  { name: "Sarah Ahmed", device: "iPhone 15 Pro", amount: "Rs 18,500", initials: "SA" },
  { name: "Ali Raza", device: "Redmi Note 13", amount: "Rs 9,000", initials: "AR" },
  { name: "Hassan Malik", device: "Samsung A56", amount: "Rs 12,500", initials: "HM" },
];

const recentPlans = [
  { customer: "Muhammad Ahmed", device: "Galaxy A56", installment: "Rs 10,000 / mo", due: "15 Oct 2026", outstanding: "Rs 100,000", status: "Active" },
  { customer: "Saad Khan", device: "iPhone 14", installment: "Rs 22,500 / mo", due: "12 Oct 2026", outstanding: "Rs 45,000", status: "Due Soon" },
  { customer: "Nadia Masood", device: "Pixel 8a", installment: "Rs 14,000 / mo", due: "08 Oct 2026", outstanding: "Rs 28,000", status: "Overdue" },
];

const statusStyle: Record<string, string> = {
  Active: "bg-success-soft text-success",
  "Due Soon": "bg-warning-soft text-warning",
  Overdue: "bg-danger-soft text-danger",
};

const toneText: Record<string, string> = {
  positive: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export function Dashboard() {
  return (
    <>
      <section className="py-14 md:py-16">
        <Container>
          <SectionHeading
            eyebrow="The dashboard"
            title="Know exactly where your money stands."
            description="Every figure on this page is demo data — a preview of the real dashboard's shape."
            className="mb-12"
          />

          <Reveal>
            <div className="overflow-hidden rounded-card border border-line shadow-[0_30px_60px_-20px_rgba(19,33,58,0.15)] md:grid md:grid-cols-[200px_1fr]">
              {/* Sidebar */}
              <div className="hidden flex-col gap-1 border-r border-line-dark bg-white p-4 md:flex">
                <div className="mb-6 flex items-center gap-2.5 px-1">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm border border-emerald/60 bg-emerald-soft">
                    <svg viewBox="0 0 128 128" className="h-4 w-4">
                      <path d="M46 59V48a18 18 0 0 1 36 0v11" fill="none" stroke={brand.colors.emeraldDeep} strokeWidth="7" strokeLinecap="round" />
                      <rect x="35" y="59" width="58" height="44" rx="9" fill={brand.colors.emeraldDeep} />
                      <circle cx="64" cy="80" r="6" fill={brand.colors.emeraldSoft} />
                      <rect x="61" y="80" width="6" height="13" rx="3" fill={brand.colors.emeraldSoft} />
                    </svg>
                  </span>
                  <span className="font-heading text-[15px] font-extrabold text-offwhite">LockPilot</span>
                </div>
                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 rounded-sm px-3 py-2.5 text-[13.5px] font-medium ${
                      item.active ? "bg-emerald-soft text-emerald-deep" : "text-slate"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>

              <div className="min-w-0">
                {/* Topbar */}
                <div className="flex items-center justify-between gap-4 border-b border-line-dark bg-white px-6 py-3.5">
                  <input
                    type="text"
                    placeholder="Search anything…"
                    disabled
                    className="w-full max-w-[220px] rounded-sm border border-line bg-navy-deep px-3 py-2 text-[13px] text-slate-light outline-none"
                  />
                  <div className="flex flex-shrink-0 items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-line text-slate">
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path d="M12 4a5 5 0 0 0-5 5v3.2l-1.4 2.8h12.8L17 12.2V9a5 5 0 0 0-5-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M9.5 17.5a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald text-[12px] font-bold text-white">
                      DM
                    </span>
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <div className="text-[12px] uppercase tracking-wide text-slate">Tuesday, 08 September 2026</div>
                      <h3 className="mt-1 font-heading text-[19px] font-extrabold text-offwhite">Good morning, Muhammad</h3>
                    </div>
                    <span className="hidden rounded-sm bg-emerald px-3.5 py-2 text-[12.5px] font-semibold text-white sm:block">
                      + New Installment
                    </span>
                  </div>

                  <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {stats.map((s) => (
                      <div key={s.label} className="rounded-card border border-line p-4">
                        <div className="mb-2 flex items-center gap-2 text-slate">
                          {s.icon}
                          <span className="text-[11.5px]">{s.label}</span>
                        </div>
                        <div className="font-heading text-[19px] font-extrabold tabular-nums text-offwhite">{s.value}</div>
                        <div className={`text-[11px] font-medium ${toneText[s.tone]}`}>{s.delta}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                    <div className="rounded-card border border-line p-5">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[12px] text-slate">Payment Overview</span>
                        <span className="rounded-pill border border-line px-2.5 py-1 text-[11px] text-slate">Last 30 days</span>
                      </div>
                      <div className="mb-4 font-heading text-[22px] font-extrabold text-offwhite">Rs 2.84M</div>
                      <svg viewBox="0 0 260 90" className="w-full" preserveAspectRatio="none">
                        <polyline
                          points={toPoints(expectedSeries, 260, 90)}
                          fill="none"
                          stroke={brand.colors.slateLight}
                          strokeWidth="2"
                          strokeDasharray="4 4"
                        />
                        <polyline
                          points={toPoints(collectedSeries, 260, 90)}
                          fill="none"
                          stroke={brand.colors.emerald}
                          strokeWidth="2.5"
                        />
                      </svg>
                      <div className="mt-2 flex justify-between text-[10.5px] text-slate-light">
                        {chartMonths.map((m) => (
                          <span key={m}>{m}</span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-card border border-line p-5">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-heading text-[13.5px] font-bold text-offwhite">Upcoming Payments</span>
                        <span className="text-[11px] text-slate">Today</span>
                      </div>
                      <div className="flex flex-col gap-3">
                        {upcomingPayments.map((p) => (
                          <div key={p.name} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-soft text-[10px] font-bold text-emerald-deep">
                                {p.initials}
                              </span>
                              <div className="min-w-0">
                                <div className="truncate text-[12.5px] font-medium text-offwhite">{p.name}</div>
                                <div className="truncate text-[11px] text-slate">{p.device}</div>
                              </div>
                            </div>
                            <span className="flex-shrink-0 font-mono text-[12px] text-offwhite">{p.amount}</span>
                          </div>
                        ))}
                      </div>
                      <span className="mt-4 block text-[12px] font-medium text-emerald">View all payments →</span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-card border border-line p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-heading text-[13.5px] font-bold text-offwhite">Recent customer plans</span>
                      <span className="text-[12px] font-medium text-emerald">View all →</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[12.5px] text-slate">
                        <thead>
                          <tr className="border-b border-line text-[10.5px] uppercase tracking-wide text-slate/70">
                            <th className="pb-2 font-normal">Customer</th>
                            <th className="pb-2 font-normal">Device</th>
                            <th className="pb-2 font-normal">Installment</th>
                            <th className="pb-2 font-normal">Next Due</th>
                            <th className="pb-2 font-normal">Outstanding</th>
                            <th className="pb-2 font-normal">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentPlans.map((p) => (
                            <tr key={p.customer} className="border-b border-line last:border-none">
                              <td className="py-2.5 font-medium text-offwhite">{p.customer}</td>
                              <td className="py-2.5">{p.device}</td>
                              <td className="py-2.5 font-mono">{p.installment}</td>
                              <td className="py-2.5">{p.due}</td>
                              <td className="py-2.5 font-mono">{p.outstanding}</td>
                              <td className="py-2.5">
                                <span className={`rounded-pill px-2.5 py-1 text-[11px] font-medium ${statusStyle[p.status]}`}>
                                  {p.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* DEVICE MANAGEMENT */}
      <section className="border-t border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Device management"
              title="Every device, searchable and filterable."
              className="mb-10"
            />
          </Reveal>
          <Reveal delay={100}>
            <DeviceTable />
          </Reveal>
        </Container>
      </section>

      {/* FINANCIAL INTELLIGENCE */}
      <section className="border-t border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Financial intelligence"
              title="It's not just phone protection. It's your installment business in one place."
              className="mb-14"
            />
          </Reveal>
          <Reveal delay={100}>
            <FinancialFlow />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
