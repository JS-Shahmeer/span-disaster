import Link from "next/link";

export default function CTASection({
  eyebrow = "Take the Next Step",
  title,
  description,
  primaryLabel = "Explore the SPAN Process",
  primaryTo = "/neighborhood-preparedness",
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-span py-20 text-center">
        <p className="eyebrow mb-4 text-accent">{eyebrow}</p>
        <h2 className="mx-auto max-w-3xl text-3xl sm:text-4xl font-semibold leading-tight text-balance">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mt-5 max-w-xl text-lg text-primary-foreground/70 leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primaryTo}
            className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryTo && (
            <Link
              href={secondaryTo}
              className="inline-flex items-center justify-center border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-md text-base font-semibold hover:bg-primary-foreground/10 transition-all focus-ring min-h-[48px]"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
