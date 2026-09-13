import { Container } from "../components/Container";

export function TermsOfService() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-[720px]">
        <h1 className="mb-8 font-heading text-[32px] font-extrabold text-navy">Terms of Service</h1>
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-slate">
          <p>
            LockPilot is a pre-launch product. These terms describe, in plain language, the basic
            expectations for anyone requesting early access or using the platform once it is
            available.
          </p>

          <Section title="Pre-launch status">
            Pricing, features, and technical capabilities described on this site reflect current
            plans and may change before general availability. Pre-launch pricing is not final.
          </Section>

          <Section title="Retailer responsibilities">
            Retailers are responsible for disclosing to customers, at the point of sale, that
            LockPilot is installed on the device and what it can do. Retailers are responsible
            for the accuracy of customer and payment records they enter into the system.
          </Section>

          <Section title="No guaranteed device behavior">
            Device lock, unlock, uninstall-protection, and location features depend on the
            Android version and device model in use. We do not guarantee identical behavior
            across every device, and describe these capabilities conservatively for that reason.
          </Section>

          <Section title="Service availability">
            As a pre-launch product, LockPilot is provided without uptime guarantees. This will
            be revisited as the platform moves toward general availability.
          </Section>

          <Section title="Changes to these terms">
            We may update these terms as the product develops. Material changes will be reflected
            on this page.
          </Section>

          <p className="text-[13px] text-slate-light">
            This is a draft set of terms for a pre-launch product and will be revised before
            general availability.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h2 className="mb-2 font-heading text-[17px] font-bold text-navy">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
