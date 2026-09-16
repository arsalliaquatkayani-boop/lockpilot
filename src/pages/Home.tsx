import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { CapabilityStrip } from "../components/CapabilityStrip";
import { ComparisonFlow } from "../components/ComparisonFlow";
import { DeviceStateAnimation } from "../components/DeviceStateAnimation";
import { LockMechanism } from "../components/LockMechanism";
import { DashboardCard } from "../components/DashboardCard";
import { DashboardChart } from "../components/DashboardChart";
import { PricingCard } from "../components/PricingCard";
import { ProductImage } from "../components/ProductImage";
import { images } from "../config/images";
import { featureItems } from "../config/features";
import { faqItems } from "../config/faq";

export function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-10 pb-14 md:pt-14 md:pb-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-emerald/[0.14] blur-[100px]" />
        <Container className="relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="mb-6 flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-emerald">
                <span className="h-px w-6 bg-emerald" />
                Device Enforcement for Installment Retail
              </span>
              <h1 className="mb-6 font-heading text-[42px] font-black leading-[1.03] tracking-[-0.01em] text-offwhite md:text-[56px]">
                Every installment, <span className="text-emerald-bright">secured</span> until it's paid.
              </h1>
              <p className="mb-9 max-w-[480px] text-[17px] leading-relaxed text-slate">
                LockPilot locks the device the moment a payment lapses, and releases it the instant
                the shop records payment. No calls. No chasing. No exceptions.
              </p>
              <div className="mb-9 flex flex-wrap gap-3.5">
                <Button to="/early-access" variant="primary">Request Early Access</Button>
                <Button to="/features" variant="ghost">Explore the Platform</Button>
              </div>
              <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
                <Stat value="Rs 2.45M" label="Capital protected" />
                <Stat value="120" label="Devices / shop" />
                <Stat value="15 min" label="Lock response" />
              </div>
            </div>

            <div className="flex justify-center">
              <LockMechanism />
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <CapabilityStrip />
      </Container>

      {/* PROBLEM */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The problem"
              title="Every unpaid installment ties up your capital."
              description="Chasing overdue customers by phone doesn't scale, and a device with no enforcement mechanism leaves your investment exposed for as long as the customer decides."
              className="mb-14"
            />
          </Reveal>
          <Reveal delay={100}>
            <ComparisonFlow />
          </Reveal>
        </Container>
      </section>

      {/* SIGNATURE DEVICE STATE */}
      <section className="relative overflow-hidden border-b border-line bg-navy-secondary py-16 md:py-20">
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(33,116,255,0.08)_1px,transparent_0)] [background-size:24px_24px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/10 blur-[100px]" />
        <Container className="relative flex flex-col items-center text-center">
          <Reveal>
            <SectionHeading
              eyebrow="How the device behaves"
              title="One system, five states."
              description="Every device in your portfolio moves through the same lifecycle — automatically."
              align="center"
              tone="dark"
              className="mb-14"
            />
          </Reveal>
          <Reveal delay={100}>
            <DeviceStateAnimation />
          </Reveal>
        </Container>
      </section>

      {/* FEATURES PREVIEW */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Built in"
              title="Everything an installment retailer needs, in one system."
              className="mb-14"
            />
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {featureItems.slice(0, 6).map((f, i) => (
              <Reveal
                key={f.id}
                delay={i * 60}
                className="group rounded-card border border-line bg-navy-secondary p-8 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/50 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm border border-emerald/40 bg-emerald/10 font-mono text-[13px] text-emerald">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mb-2.5 font-heading text-[16.5px] font-bold text-offwhite">{f.title}</h3>
                <p className="text-[14.5px] leading-relaxed text-slate">{f.description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10">
            <Button to="/features" variant="ghost">See all features</Button>
          </Reveal>
        </Container>
      </section>

      {/* DASHBOARD SHOWCASE PREVIEW */}
      <section className="border-b border-line bg-navy-secondary py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The dashboard"
              title="Know exactly where your money stands."
              description="Every number below is demo data — a preview of the real dashboard's shape."
              tone="dark"
              className="mb-14"
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="overflow-hidden rounded-card border border-line bg-navy-deep shadow-[0_30px_60px_-20px_rgba(19,33,58,0.15)]">
              <div className="grid grid-cols-2 gap-px border-b border-line bg-line md:grid-cols-4">
                <DashboardCard label="Total Capital Invested" value="Rs 2,450,000" />
                <DashboardCard label="Total Collected" value="Rs 1,780,000" tone="positive" />
                <DashboardCard label="Outstanding Receivables" value="Rs 670,000" />
                <DashboardCard label="Overdue" value="Rs 185,000" tone="danger" />
              </div>
              <div className="p-5">
                <DashboardChart />
              </div>
            </div>
          </Reveal>
          <Reveal delay={200} className="mt-10">
            <Button to="/dashboard" variant="ghost">Explore the dashboard</Button>
          </Reveal>
        </Container>
      </section>

      {/* RETAIL POSITIONING */}
      <section className="border-b border-line py-16 md:py-20">
        <Container className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Built for Pakistan's retailers"
              title="Not a generic SaaS tool. Built around how an installment counter actually runs."
              description="LockPilot is designed around the daily reality of installment retail in Pakistan — a busy counter, a paper ledger giving way to a dashboard, and a business that depends on getting paid on time."
            />
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]">
              <ProductImage {...images.retailBoutiqueDaytime} className="h-full w-full" label="Retail context" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/50 via-transparent to-transparent" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* PRICING TEASER */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Pricing" title="Simple pricing. Serious control." className="mb-10" />
          </Reveal>
          <Reveal delay={100}>
            <PricingCard />
          </Reveal>
        </Container>
      </section>

      {/* FAQ TEASER */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="FAQ" title="Questions retailers actually ask." className="mb-10" />
          </Reveal>
          <Reveal delay={100} className="border-t border-line">
            {faqItems.slice(0, 3).map((item) => (
              <div key={item.question} className="border-b border-line py-5">
                <h3 className="font-heading text-[16px] font-bold text-offwhite">{item.question}</h3>
                <p className="mt-2 max-w-[600px] text-[14.5px] text-slate">{item.answer}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={200} className="mt-8">
            <Button to="/faq" variant="ghost">See all questions</Button>
          </Reveal>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-navy-secondary py-20 text-center">
        <div className="absolute inset-0 opacity-20">
          <ProductImage {...images.retailNightHandover} className="h-full w-full" label="Final CTA visual" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy-secondary via-navy-secondary/95 to-navy-secondary/80" />
        <Container className="relative">
          <Reveal>
            <h2 className="mx-auto mb-5 max-w-[600px] font-heading text-[34px] font-extrabold leading-tight text-offwhite md:text-[42px]">
              Your phones should enforce the plan.
            </h2>
            <p className="mx-auto mb-9 max-w-[480px] text-[16px] text-slate">
              Protect your devices. Track your money. Spend less time chasing overdue payments.
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Button to="/early-access" variant="primary">Request Early Access</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[19px] font-semibold tabular-nums text-emerald-bright">{value}</span>
      <span className="text-[11px] uppercase tracking-[0.04em] text-slate-light">{label}</span>
    </div>
  );
}
