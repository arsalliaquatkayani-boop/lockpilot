import { Container } from "../components/Container";

export function TermsOfService() {
  return (
    <section className="py-14 md:py-16">
      <Container className="max-w-[720px]">
        <h1 className="mb-8 font-heading text-[32px] font-extrabold text-offwhite">Terms of Service</h1>
        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-slate">
          <p>
            LockPilot is in active development and has not yet launched commercially. These terms
            describe, in plain language, the basic expectations for anyone using the platform.
            They will be reviewed by a qualified lawyer before any shop is charged for the service.
          </p>

          <Section title="Mandatory customer disclosure">
            Before installing LockPilot on a device being sold on installments, the retailer must
            tell the customer, in writing, as part of the sale — not verbally, not buried in fine
            print — that this software is installed, what it does (it can lock the device and
            block a factory reset if a payment is missed, and unlocks automatically once paid),
            and who to contact about it. Installing device-management software on someone else's
            phone without their knowledge is not a feature LockPilot offers under any
            configuration, and a retailer may not use the product to do so. LockPilot reserves the
            right to suspend an account it believes is being used this way.
          </Section>

          <Section title="Retailer responsibilities">
            Retailers are responsible for the accuracy of the customer, device, and payment
            records they enter, and for keeping their staff login credentials secure — anyone
            signed in to a shop's account can see that shop's customer and payment data, lock and
            unlock its devices, and record payments on its behalf.
          </Section>

          <Section title="No guaranteed device behavior">
            Locking, unlocking, uninstall-protection, and factory-reset-blocking depend on the
            Android version and device model in use, and on the device having network
            connectivity to receive updates. We do not guarantee identical behavior across every
            device or manufacturer, and describe these capabilities conservatively for that
            reason. Factory-reset blocking prevents the normal in-Settings reset option on a
            device already set up with LockPilot; it is not a guarantee against a technically
            sophisticated attempt to reflash the device's firmware with physical access.
          </Section>

          <Section title="Service availability">
            As a product still in development, LockPilot is provided without uptime guarantees.
            This will be revisited as the platform moves toward general availability.
          </Section>

          <Section title="Changes to these terms">
            We may update these terms as the product develops. Material changes will be reflected
            on this page.
          </Section>

          <p className="text-[13px] text-slate-light">
            This is a draft set of terms for a product still in development and has not been
            reviewed by a lawyer. It will be revised, with legal review, before LockPilot is sold
            commercially.
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
