import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { FAQAccordion } from "../components/FAQAccordion";

export function Faq() {
  return (
    <section className="py-14 md:py-16">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title="Questions retailers actually ask."
          className="mb-12"
        />
        <FAQAccordion />
      </Container>
    </section>
  );
}
