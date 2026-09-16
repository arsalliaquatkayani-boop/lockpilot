import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { DeviceStateAnimation } from "../components/DeviceStateAnimation";
import { LockDemo } from "../components/LockDemo";

const steps = [
  {
    num: "01",
    title: "Sell the phone",
    body: "Install LockPilot and register the device at the counter, at the moment of sale.",
    icon: "M6 4h9l3 3v13H6V4z M15 4v3h3 M9 12h6 M9 15h4",
  },
  {
    num: "02",
    title: "Create the installment plan",
    body: "Record the customer, the device, the payment schedule, and the amounts — all in your dashboard.",
    icon: "M4 6.5h16 M4 6.5V18a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 18V6.5 M8 3.5v4 M16 3.5v4 M8 12h3 M8 15.5h6",
  },
  {
    num: "03",
    title: "Payment becomes overdue",
    body: "LockPilot can automatically enforce the overdue state once the grace period ends.",
  },
  {
    num: "04",
    title: "Payment is received",
    body: "The device can automatically return to its normal state once the payment is recorded.",
  },
];

function StepIllustration({ path }: { path: string }) {
  return (
    <div className="flex aspect-[4/3] w-full max-w-[440px] items-center justify-center rounded-card border border-line bg-navy-secondary">
      <span className="flex h-20 w-20 items-center justify-center rounded-full border border-emerald/30 bg-emerald-soft text-emerald">
        <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
          <path d={path} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}

export function HowItWorks() {
  return (
    <>
      <section className="py-14 md:py-16">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="From sale to enforcement, in four steps."
            description="LockPilot handles the enforcement at every step of the installment lifecycle, so you can focus on running your shop."
            className="mb-16"
          />

          <div className="flex flex-col gap-20">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 60}>
                <div
                  className={`grid items-center gap-12 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <span className="mb-3 block font-mono text-[13px] text-slate-light">{step.num}</span>
                    <h3 className="mb-3 font-heading text-[26px] font-bold text-offwhite">{step.title}</h3>
                    <p className="max-w-[440px] text-[15.5px] leading-relaxed text-slate">{step.body}</p>
                  </div>
                  <div className="flex justify-center">
                    {step.icon ? (
                      <StepIllustration path={step.icon} />
                    ) : step.num === "03" || step.num === "04" ? (
                      <LockDemo />
                    ) : null}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-navy-secondary py-16 md:py-20">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <SectionHeading
              eyebrow="The signature interaction"
              title="The system handles the enforcement. You handle the business."
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
    </>
  );
}
