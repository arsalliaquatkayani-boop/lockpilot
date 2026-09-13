import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { LeadForm } from "../components/LeadForm";

export function EarlyAccess() {
  return (
    <section className="py-14 md:py-16">
      <Container className="max-w-[720px]">
        <SectionHeading
          eyebrow="Get started"
          title="Request early access."
          description="Tell us a bit about your shop and we'll reach out on WhatsApp."
          className="mb-10"
        />
        <LeadForm />
      </Container>
    </section>
  );
}
