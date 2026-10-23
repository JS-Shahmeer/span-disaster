import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

const legalContent = {
  "/privacy": {
    title: "Privacy Policy",
    description: "How SPAN Disaster Services handles visitor information.",
  },
  "/terms": {
    title: "Terms of Use",
    description: "The terms governing use of this website.",
  },
  "/accessibility": {
    title: "Accessibility Statement",
    description: "SPAN's commitment to web accessibility.",
  },
  "/shipping": {
    title: "Shipping & Returns",
    description: "Information about storefront orders.",
  },
};

export default function Legal({ pathname }) {
  const content = legalContent[pathname] || { title: "Legal", description: "" };

  return (
    <section className="bg-background">
      <div className="container-narrow py-16 lg:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <FileText className="h-6 w-6" />
          </div>
          <div className="eyebrow">Legal</div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-primary mb-3">{content.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{content.description}</p>
        <div className="bg-card rounded-xl p-7 border border-dashed border-border">
          <p className="text-muted-foreground leading-relaxed">
            The full {content.title.toLowerCase()} will be published here once the official document is
            finalized. Please check back soon, or{" "}
            <Link href="/contact" className="text-secondary underline hover:no-underline">
              contact SPAN
            </Link>{" "}
            with any questions.
          </p>
        </div>
      </div>
    </section>
  );
}
