import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { PricingCard } from "../components/PricingCard";

export function Pricing() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing. Serious control."
          description="One plan, priced for a real installment book — not a side hustle."
          className="mb-12"
        />
        <Reveal>
          <PricingCard />
        </Reveal>
      </Container>
    </section>
  );
}
