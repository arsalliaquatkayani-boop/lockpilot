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
import { faqItems } from "../config/faq";

const icon = (path: string) => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <path d={path} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const connectedSystemItems = [
  {
    title: "Installment Management",
    description: "Create and manage flexible plans from one clear workspace.",
    icon: icon("M6 4h9l3 3v13H6V4z M15 4v3h3"),
  },
  {
    title: "Customer Management",
    description: "Keep every financed customer organized and in context.",
    icon: icon("M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5 M16 8.5a2.2 2.2 0 1 0 0-4.4 M15 13.2c2.2.2 3.8 1.9 3.8 4.3"),
  },
  {
    title: "Smart Ledger",
    description: "Track payments, balances and transaction history.",
    icon: icon("M4 4h16v16H4V4z M8 9h8 M8 13h8 M8 17h5"),
  },
  {
    title: "Payment Tracking",
    description: "See paid, upcoming and overdue installments instantly.",
    icon: icon("M12 3v18 M17 7.5c0-1.7-2.2-3-5-3s-5 1.3-5 3 2.2 3 5 3 5 1.3 5 3-2.2 3-5 3-5-1.3-5-3"),
  },
  {
    title: "Device Management",
    description: "Connect every financed device to its customer account.",
    icon: icon("M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z M10.5 18h3"),
  },
  {
    title: "Remote Lock & Unlock",
    description: "Control enrolled devices from your central dashboard.",
    icon: icon("M6 11V8a6 6 0 0 1 12 0v3 M5 11h14v9H5v-9z"),
  },
  {
    title: "Automatic Protection",
    description: "Configure protection after your chosen grace period.",
    icon: icon("M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"),
  },
  {
    title: "QR Device Setup",
    description: "Connect Android devices quickly with a simple scan.",
    icon: icon("M4 4h6v6H4V4z M14 4h6v6h-6V4z M4 14h6v6H4v-6z M15 15h2v2h-2z M18 15h2v5h-5v-2"),
  },
  {
    title: "Payment History",
    description: "Keep a complete record of every payment received.",
    icon: icon("M4 4h16v16H4V4z M8 9h8 M8 13h5"),
  },
  {
    title: "Outstanding Balance",
    description: "Know exactly what remains for every customer.",
    icon: icon("M12 2 3 7v6c0 5 3.8 8.7 9 9 5.2-.3 9-4 9-9V7l-9-5z"),
  },
  {
    title: "Analytics",
    description: "Understand installment activity across the business.",
    icon: icon("M4 20V10 M11 20V4 M18 20v-7"),
  },
  {
    title: "Staff Access",
    description: "Give authorized team members the access they need.",
    icon: icon("M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5"),
  },
];

export function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-10 pb-14 md:pt-14 md:pb-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-emerald/[0.14] blur-[100px]" />
        <Container className="relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-pill border border-line bg-navy-secondary px-3.5 py-1.5 text-[12px] font-medium text-slate">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                The operating system for phone installments
              </span>
              <h1 className="mb-6 font-heading text-[42px] font-extrabold leading-[1.08] tracking-[-0.02em] text-offwhite md:text-[54px]">
                Run your phone installment business with{" "}
                <span className="text-emerald">total control</span>.
              </h1>
              <p className="mb-9 max-w-[480px] text-[17px] leading-relaxed text-slate">
                Manage customers, payments, ledgers and financed devices from one powerful
                platform — with built-in remote device control.
              </p>
              <div className="mb-9 flex flex-wrap items-center gap-3.5">
                <Button to="/early-access" variant="primary">Get started</Button>
                <Button to="/how-it-works" variant="ghost">See how it works</Button>
              </div>
              <div className="flex items-center gap-3 border-t border-line pt-6">
                <div className="flex -space-x-2">
                  {["AR", "BH", "SM", "UT"].map((initials) => (
                    <span
                      key={initials}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-navy-deep bg-emerald-soft text-[10.5px] font-bold text-emerald-deep"
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <span className="text-[13px] text-slate">Built for modern mobile retailers</span>
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
              eyebrow="The old way"
              title="Installment sales shouldn't mean losing control."
              description="When your business grows, a notebook and a few chat threads are not a system. LockPilot brings the moving parts of your retail operation into one source of truth."
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

      {/* ONE CONNECTED SYSTEM */}
      <section className="border-b border-line py-16 md:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="One connected system"
              title="Everything your team needs to move with clarity."
              description="Purpose-built tools for the day-to-day reality of mobile retail and installment sales."
              className="mb-14"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {connectedSystemItems.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 40}
                className="rounded-card border border-line bg-navy-secondary p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald/50"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm border border-emerald/30 bg-emerald-soft text-emerald">
                  {item.icon}
                </div>
                <h3 className="mb-2 font-heading text-[15px] font-bold text-offwhite">{item.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-slate">{item.description}</p>
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
