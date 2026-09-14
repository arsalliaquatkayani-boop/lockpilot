import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { PricingCard } from "../components/PricingCard";

export function Pricing() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing. Serious control."
          description="Three tiers, sized for a real installment book — not a side hustle."
          className="mb-12"
        />
        <Reveal>
          <PricingCard />
        </Reveal>
      </Container>
    </section>
  );
}
