import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { ComparisonFlow } from "../components/ComparisonFlow";
import { DeviceStateAnimation } from "../components/DeviceStateAnimation";
import { featureItems } from "../config/features";

const editorial = featureItems.filter((f) =>
  ["auto-lock", "audit-log", "financial-visibility"].includes(f.id),
);
const supporting = featureItems.filter(
  (f) => !["auto-lock", "audit-log", "financial-visibility"].includes(f.id),
);

export function Features() {
  return (
    <>
      <section className="py-14 md:py-16">
        <Container>
          <SectionHeading
            eyebrow="Features"
            title="Everything an installment retailer needs, built around one lifecycle."
            className="mb-16"
          />

          <div className="flex flex-col gap-16">
            <Reveal>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-heading text-[26px] font-bold text-navy">
                    {editorial[0].title}
                  </h3>
                  <p className="max-w-[440px] text-[15.5px] leading-relaxed text-slate">
                    {editorial[0].description}
                  </p>
                </div>
                <DeviceStateAnimation />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="grid items-center gap-12 lg:grid-cols-2 lg:[&>*:first-child]:order-2">
                <div>
                  <h3 className="mb-3 font-heading text-[26px] font-bold text-navy">
                    {editorial[1].title}
                  </h3>
                  <p className="max-w-[440px] text-[15.5px] leading-relaxed text-slate">
                    {editorial[1].description}
                  </p>
                </div>
                <AuditLogSnippet />
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-heading text-[26px] font-bold text-navy">
                    {editorial[2].title}
                  </h3>
                  <p className="max-w-[440px] text-[15.5px] leading-relaxed text-slate">
                    {editorial[2].description}
                  </p>
                </div>
                <FinancialSnippet />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SUPPORTING GRID */}
      <section className="border-t border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Also included" title="The rest of the system." className="mb-14" />
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
            {supporting.map((f, i) => (
              <Reveal key={f.id} delay={i * 60} className="bg-white p-8">
                <h3 className="mb-2.5 font-heading text-[16.5px] font-bold text-navy">{f.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-slate">{f.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ARCHITECTURE */}
      <section className="border-t border-line bg-offwhite py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="How it fits together" title="The LockPilot ecosystem." className="mb-14" />
          </Reveal>
          <Reveal delay={100}>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-card border border-line bg-white p-8">
                <h3 className="mb-4 font-heading text-[17px] font-bold text-navy">LockPilot Android App</h3>
                <ul className="flex flex-col gap-2.5 text-[14.5px] text-slate">
                  <li>Device status</li>
                  <li>Lock / unlock</li>
                  <li>Protection</li>
                </ul>
              </div>
              <div className="rounded-card border border-line bg-white p-8">
                <h3 className="mb-4 font-heading text-[17px] font-bold text-navy">LockPilot Web Dashboard</h3>
                <ul className="flex flex-col gap-2.5 text-[14.5px] text-slate">
                  <li>Customers</li>
                  <li>Devices</li>
                  <li>Payments</li>
                  <li>Locations</li>
                  <li>Financials</li>
                  <li>Reports</li>
                  <li>Event logs</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* COMPARISON */}
      <section className="border-t border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Before & after" title="The last step is the only thing that changes." className="mb-14" />
          </Reveal>
          <Reveal delay={100}>
            <ComparisonFlow />
          </Reveal>
        </Container>
      </section>

      {/* TRUST / CONTROL */}
      <section className="border-t border-line bg-navy py-16 text-white md:py-20">
        <Container className="text-center">
          <Reveal>
            <div className="mx-auto mb-10 flex max-w-[640px] flex-wrap justify-center gap-x-10 gap-y-4 font-heading text-[22px] font-bold text-emerald md:text-[28px]">
              <span>Clear</span>
              <span>Automatic</span>
              <span>Accountable</span>
              <span>Controlled</span>
            </div>
            <p className="mx-auto max-w-[560px] text-[15.5px] text-slate-light">
              Retailers keep full visibility and control over their installment portfolio at every
              stage — enforcement runs automatically, but nothing happens outside your view.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* SECURITY & PRIVACY */}
      <section className="border-t border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Security & privacy"
              title="Location and device data, handled conservatively."
              className="mb-12"
            />
          </Reveal>
          <Reveal delay={100} className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2.5 font-heading text-[16px] font-bold text-navy">Permission-aware location</h3>
              <p className="text-[14.5px] leading-relaxed text-slate">
                Location visibility depends on Android permissions, device connectivity, and the
                current implementation. When available, you see a last-known location — not a
                guaranteed live position.
              </p>
            </div>
            <div>
              <h3 className="mb-2.5 font-heading text-[16px] font-bold text-navy">Auditable events</h3>
              <p className="text-[14.5px] leading-relaxed text-slate">
                Every lock, unlock, and status change is logged with a timestamp and trigger, so
                account activity stays reviewable rather than opaque.
              </p>
            </div>
            <div>
              <h3 className="mb-2.5 font-heading text-[16px] font-bold text-navy">Controlled account access</h3>
              <p className="text-[14.5px] leading-relaxed text-slate">
                Only your shop's account can view or act on your devices and customer records.
              </p>
            </div>
            <div>
              <h3 className="mb-2.5 font-heading text-[16px] font-bold text-navy">No overclaiming</h3>
              <p className="text-[14.5px] leading-relaxed text-slate">
                We don't claim security certifications or compliance approvals we don't currently
                hold. If that changes, we'll say so explicitly, here.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function AuditLogSnippet() {
  const rows = [
    { event: "Locked", device: "LP-1042", time: "10:12 AM", trigger: "Overdue" },
    { event: "Unlocked", device: "LP-1097", time: "9:48 AM", trigger: "Payment received" },
    { event: "Manual unlock", device: "LP-1118", time: "Yesterday", trigger: "Retailer override" },
  ];
  return (
    <div className="rounded-card border border-line bg-white p-2 text-[13px]">
      {rows.map((r) => (
        <div key={r.device + r.time} className="flex items-center justify-between border-b border-line px-3 py-3 last:border-none">
          <span className="font-medium text-navy">{r.event}</span>
          <span className="font-mono text-slate-light">{r.device}</span>
          <span className="text-slate-light">{r.trigger}</span>
          <span className="font-mono text-slate-light">{r.time}</span>
        </div>
      ))}
    </div>
  );
}

function FinancialSnippet() {
  const rows = [
    { label: "Capital invested", value: "Rs 2,450,000" },
    { label: "Collected", value: "Rs 1,780,000" },
    { label: "Outstanding", value: "Rs 670,000" },
    { label: "Expected profit", value: "Rs 420,000" },
  ];
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
      {rows.map((r) => (
        <div key={r.label} className="bg-white p-5">
          <div className="mb-1.5 text-[12px] text-slate-light">{r.label}</div>
          <div className="font-mono text-[17px] text-navy">{r.value}</div>
        </div>
      ))}
    </div>
  );
}
