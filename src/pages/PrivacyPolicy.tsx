import { Container } from "../components/Container";

export function PrivacyPolicy() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-[720px]">
        <h1 className="mb-8 font-heading text-[32px] font-extrabold text-navy">Privacy Policy</h1>
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-slate">
          <p>
            LockPilot is a pre-launch product. This policy describes, in plain terms, what data
            the system is designed to handle once retailers are using it, and how we intend to
            treat it.
          </p>

          <Section title="What we collect">
            LockPilot is designed to handle: device lock/unlock state, payment and installment
            records entered by the retailer, customer records entered by the retailer (name,
            contact, city), and — where the device's Android permissions and connectivity allow
            it — a last-known device location. LockPilot does not access messages, photos,
            contacts, or call history on the device.
          </Section>

          <Section title="Who can see it">
            Customer and device data belongs to the retailer's account. LockPilot does not sell
            data or share it with third parties for advertising.
          </Section>

          <Section title="Location data">
            Location visibility depends on the device's permissions and connectivity, and is
            shown as a last-known position rather than continuous live tracking. Retailers are
            responsible for disclosing device monitoring to their customers at the point of sale.
          </Section>

          <Section title="Retention and deletion">
            We intend to retain account data for as long as an account is active, and to support
            deletion requests once account infrastructure exists. This section will be updated
            with specifics before general availability.
          </Section>

          <Section title="Contact">
            This policy will be updated with a dedicated contact channel once LockPilot is
            further along. For now, reach out through the early-access form.
          </Section>

          <p className="text-[13px] text-slate-light">
            This is a draft policy for a pre-launch product and will be revised before general
            availability.
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
