import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { CapabilityStrip } from "../components/CapabilityStrip";
import { ComparisonFlow } from "../components/ComparisonFlow";
import { DeviceStateAnimation } from "../components/DeviceStateAnimation";
import { LockDemo } from "../components/LockDemo";
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
      <section className="relative overflow-hidden pt-10 pb-10 md:pt-14 md:pb-16">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="mb-6 inline-block font-mono text-[12.5px] uppercase tracking-[0.06em] text-emerald-deep">
                Device Enforcement for Installment Retail
              </span>
              <h1 className="mb-6 font-heading text-[42px] font-extrabold leading-[1.08] text-navy md:text-[54px]">
                Stop chasing payments. Let the phone enforce the plan.
              </h1>
              <p className="mb-9 max-w-[480px] text-[17.5px] leading-relaxed text-slate">
                LockPilot helps mobile retailers protect installment sales with automated device
                controls, payment tracking, factory-reset protection, and real-time financial
                insight.
              </p>
              <div className="mb-6 flex flex-wrap gap-3.5">
                <Button to="/early-access" variant="primary">Request Early Access</Button>
                <Button to="/features" variant="ghost">Explore the Platform</Button>
              </div>
              <p className="text-[13.5px] text-slate-light">
                Built for installment retailers in Pakistan · Android · Web Dashboard
              </p>
            </div>

            <div className="relative pb-10 pr-6 md:pb-14 md:pr-10">
              <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-emerald/15 blur-[80px]" />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-line shadow-[0_30px_60px_-25px_rgba(28,24,21,0.35)]">
                <ProductImage {...images.heroHandover} className="h-full w-full" label="Hero visual" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-2 -right-2 hidden origin-bottom-right scale-[0.82] drop-shadow-[0_20px_35px_rgba(28,24,21,0.35)] sm:block md:-bottom-4 md:-right-4">
                <LockDemo />
              </div>
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
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px]" />
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
                className="group rounded-card border border-line bg-white p-8 shadow-[0_2px_8px_-4px_rgba(28,24,21,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald/40 hover:shadow-[0_20px_40px_-20px_rgba(28,24,21,0.25)]"
              >
                <div className="mb-4 h-9 w-9 rounded-sm bg-emerald-soft" />
                <h3 className="mb-2.5 font-heading text-[16.5px] font-bold text-navy">{f.title}</h3>
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
      <section className="border-b border-navy bg-navy py-16 text-white md:py-20">
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
            <div className="overflow-hidden rounded-card border border-line-dark bg-navy-deep shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              <div className="grid grid-cols-2 gap-px border-b border-line-dark bg-line-dark md:grid-cols-4">
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
            <Button to="/dashboard" variant="ghost-dark">Explore the dashboard</Button>
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
            <div className="aspect-[4/3] overflow-hidden rounded-card border border-line shadow-[0_30px_60px_-25px_rgba(28,24,21,0.3)]">
              <ProductImage {...images.retailBoutiqueDaytime} className="h-full w-full" label="Retail context" />
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
                <h3 className="font-heading text-[16px] font-bold text-navy">{item.question}</h3>
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
      <section className="relative overflow-hidden bg-navy py-20 text-center text-white">
        <div className="absolute inset-0 opacity-25">
          <ProductImage {...images.retailNightHandover} className="h-full w-full" label="Final CTA visual" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/90 to-navy/70" />
        <Container className="relative">
          <Reveal>
            <h2 className="mx-auto mb-5 max-w-[600px] font-heading text-[34px] font-extrabold leading-tight md:text-[42px]">
              Your phones should enforce the plan.
            </h2>
            <p className="mx-auto mb-9 max-w-[480px] text-[16px] text-slate-light">
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
