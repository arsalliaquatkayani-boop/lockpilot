import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { DeviceStateAnimation } from "../components/DeviceStateAnimation";
import { LockDemo } from "../components/LockDemo";
import { ProductImage } from "../components/ProductImage";
import { images } from "../config/images";

const steps = [
  {
    num: "01",
    title: "Sell the phone",
    body: "Install LockPilot and register the device at the counter, at the moment of sale.",
    image: images.retailNightHandover,
  },
  {
    num: "02",
    title: "Create the installment plan",
    body: "Record the customer, the device, the payment schedule, and the amounts — all in your dashboard.",
    image: images.retailLaptopFlag,
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

export function HowItWorks() {
  return (
    <>
      <section className="py-20 md:py-28">
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
                    <h3 className="mb-3 font-heading text-[26px] font-bold text-navy">{step.title}</h3>
                    <p className="max-w-[440px] text-[15.5px] leading-relaxed text-slate">{step.body}</p>
                  </div>
                  <div className="flex justify-center">
                    {step.image ? (
                      <div className="aspect-[4/3] w-full max-w-[440px] overflow-hidden rounded-card border border-line">
                        <ProductImage {...step.image} className="h-full w-full" label={`Step ${step.num}`} />
                      </div>
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

      <section className="border-t border-line bg-offwhite py-24 md:py-32">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <SectionHeading
              eyebrow="The signature interaction"
              title="The system handles the enforcement. You handle the business."
              align="center"
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
