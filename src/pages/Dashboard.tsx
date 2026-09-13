import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { DashboardCard } from "../components/DashboardCard";
import { DashboardChart } from "../components/DashboardChart";
import { DeviceTable } from "../components/DeviceTable";
import { DeviceLocationList } from "../components/DeviceLocationList";
import { FinancialFlow } from "../components/FinancialFlow";

const sidebarItems = [
  "Overview",
  "Customers",
  "Devices",
  "Payments",
  "Installment Plans",
  "Locations",
  "Reports",
  "Event Logs",
  "Settings",
];

export function Dashboard() {
  return (
    <>
      <section className="bg-navy py-20 text-white md:py-28">
        <Container>
          <SectionHeading
            eyebrow="The dashboard"
            title="Know exactly where your money stands."
            description="Every figure on this page is demo data — a preview of the dashboard's shape before real accounts exist."
            tone="dark"
            className="mb-14"
          />

          <Reveal>
            <div className="grid overflow-hidden rounded-card border border-line-dark bg-navy-deep md:grid-cols-[200px_1fr]">
              <div className="hidden border-r border-line-dark p-4 md:block">
                {sidebarItems.map((item, i) => (
                  <div
                    key={item}
                    className={`mb-1 rounded-sm px-3 py-2.5 text-[13.5px] ${
                      i === 0 ? "bg-emerald/15 text-emerald" : "text-slate-light"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="p-5 md:p-6">
                <div className="mb-5 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line-dark bg-line-dark md:grid-cols-3">
                  <DashboardCard label="Total Capital Invested" value="Rs 2,450,000" />
                  <DashboardCard label="Total Collected" value="Rs 1,780,000" tone="positive" />
                  <DashboardCard label="Outstanding Receivables" value="Rs 670,000" />
                  <DashboardCard label="Overdue" value="Rs 185,000" tone="danger" />
                  <DashboardCard label="Expected Profit" value="Rs 420,000" tone="positive" />
                  <DashboardCard label="Active Devices" value="47 / 50" />
                </div>
                <DashboardChart />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* DEVICE MANAGEMENT */}
      <section className="bg-navy pb-16 text-white md:pb-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Device management"
              title="Every device, searchable and filterable."
              tone="dark"
              className="mb-10"
            />
          </Reveal>
          <Reveal delay={100}>
            <DeviceTable />
          </Reveal>
        </Container>
      </section>

      {/* FINANCIAL INTELLIGENCE */}
      <section className="border-b border-line py-16 md:py-20">
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

      {/* LOCATION VISIBILITY */}
      <section className="border-b border-line bg-offwhite py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Location visibility"
              title="Know where your devices are."
              description="Device location visibility, not customer tracking — shown only where permissions and connectivity allow, using a last-known position."
              className="mb-14"
            />
          </Reveal>
          <Reveal delay={100}>
            <DeviceLocationList />
          </Reveal>
          <Reveal delay={200} className="mt-6 max-w-[640px] text-[13.5px] text-slate">
            Location availability depends on Android permissions, device connectivity, the
            specific implementation, and the device's own settings. Where location cannot be
            determined, the dashboard states that plainly rather than guessing.
          </Reveal>
        </Container>
      </section>
    </>
  );
}
