import { Container } from "../components/Container";
import { Button } from "../components/Button";

export function NotFound() {
  return (
    <section className="flex min-h-[50vh] items-center justify-center py-16">
      <Container className="text-center">
        <h1 className="mb-4 font-heading text-[28px] font-bold text-offwhite">Page not found</h1>
        <p className="mb-8 text-[15px] text-slate">The page you're looking for doesn't exist.</p>
        <Button to="/" variant="primary">Back to home</Button>
      </Container>
    </section>
  );
}
