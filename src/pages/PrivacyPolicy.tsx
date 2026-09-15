import { Container } from "../components/Container";

export function PrivacyPolicy() {
  return (
    <section className="py-14 md:py-16">
      <Container className="max-w-[720px]">
        <h1 className="mb-8 font-heading text-[32px] font-extrabold text-offwhite">Privacy Policy</h1>
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-slate">
          <p>
            LockPilot is in active development and has not yet launched commercially. This policy
            describes, honestly and specifically, what data the system handles today. It will be
            reviewed by a qualified lawyer before any shop is charged for the service.
          </p>

          <Section title="What we collect">
            The system stores: shop and staff account details (name, login email); customer
            records entered by shop staff (name, phone, city, address); device records (a label,
            IMEI, and a pairing credential used only so the device can check its own lock status);
            installment plan and payment records entered by staff; and a timestamped log of every
            lock and unlock event, automatic or manual. LockPilot does not access messages,
            photos, contacts, call history, or any other app's data on the customer's device.
          </Section>

          <Section title="Location data">
            Device location visibility is planned but not yet built into the product. This policy
            will be updated with specifics — what is collected, how it is shown, and how a
            retailer must disclose it to the customer — before that feature ships, not after.
          </Section>

          <Section title="Who can see it">
            A shop's customer, device, and payment data is visible only to that shop's own staff
            accounts, enforced at the database level. LockPilot's operator can access data only as
            needed to run and support the service. Data is not sold, and is not shared with third
            parties for advertising.
          </Section>

          <Section title="How data is protected">
            Staff sign in with their own email and password; each shop's data is isolated from
            every other shop's by server-side access rules, not just by the app's design. Devices
            authenticate with a per-device credential that can only ever read that one device's
            own lock status — never any other device's or shop's data.
          </Section>

          <Section title="Retention and deletion">
            Account data is retained for as long as an account is active. A shop owner who wants
            their data deleted can request it; as the product matures, this will become a
            self-service option rather than a manual request.
          </Section>

          <Section title="Contact">
            This policy will be updated with a dedicated support channel before commercial launch.
            For now, reach out through the early-access form.
          </Section>

          <p className="text-[13px] text-slate-light">
            This is a draft policy for a product still in development and has not been reviewed by
            a lawyer. It will be revised, with legal review, before LockPilot is sold commercially.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <div>
      <h2 className="mb-2 font-heading text-[17px] font-bold text-offwhite">{title}</h2>
      <p>{children}</p>
    </div>
  );
}
