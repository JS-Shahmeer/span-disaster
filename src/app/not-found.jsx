import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-background">
      <div className="container-narrow py-24 text-center">
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="mt-4 text-lg text-muted-foreground">The page you are looking for does not exist or has moved.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
