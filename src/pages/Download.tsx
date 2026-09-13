import { Container } from "../components/Container";
import { SectionHeading } from "../components/SectionHeading";
import { Button } from "../components/Button";
import { APK_DOWNLOAD_URL } from "../config/config";

export function Download() {
  return (
    <section className="py-16 md:py-20">
      <Container className="text-center">
        <SectionHeading
          eyebrow="Download"
          title="The app that keeps every installment phone accountable."
          description="Android app · APK download"
          align="center"
          className="mx-auto mb-10"
        />
        <Button href={APK_DOWNLOAD_URL} download variant="primary">
          Download App
        </Button>
        <p className="mx-auto mt-8 max-w-[480px] text-[13px] text-slate-light">
          LockPilot is distributed as a direct APK install at the time of sale and is not
          currently listed on the Google Play Store. If you're a retailer requesting early
          access, we'll walk you through installation.
        </p>
      </Container>
    </section>
  );
}
