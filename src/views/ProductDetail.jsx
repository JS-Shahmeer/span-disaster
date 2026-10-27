import Link from "next/link";
import { ArrowLeft, ShoppingCart, Check, Package, BookOpen, Download, ArrowRight } from "lucide-react";

const categoryIcons = {
  workbook: BookOpen,
  personal: Package,
  educational: BookOpen,
  free: Download,
};

export default function ProductDetail({ product, resources }) {

  if (!product) return null;

  const Icon = categoryIcons[product.category] || Package;
  const isFree = product.price === 0;

  return (
    <>
      {/* Header */}
      <section className="bg-background border-b border-border">
        <div className="container-span py-10 lg:py-14">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-muted rounded-2xl flex items-center justify-center border border-border">
              <Icon className="h-24 w-24 text-muted-foreground/40" />
            </div>

            {/* Details */}
            <div>
              {product.badge && (
                <span className="inline-block text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/10 text-secondary mb-4">
                  {product.badge}
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-semibold text-primary mb-3">{product.name}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              {product.intendedAudience && (
                <div className="mb-6 bg-muted/40 rounded-xl p-5 border border-border">
                  <h2 className="text-sm font-semibold text-primary mb-1.5">Intended Audience</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.intendedAudience}</p>
                </div>
              )}

              <div className="bg-card rounded-xl p-5 border border-border mb-6">
                <h2 className="text-sm font-semibold text-primary mb-3">What's Included</h2>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-semibold text-primary">{product.priceNote}</span>
                <span className="text-sm text-muted-foreground">
                  · {product.format} · {product.delivery}
                </span>
              </div>

              <button
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-base font-semibold hover:bg-primary/90 transition-all focus-ring min-h-[48px] disabled:opacity-60"
                disabled
              >
                <ShoppingCart className="h-5 w-5" />
                {isFree ? "Download Free" : "Add to Cart"}
              </button>
              <p className="mt-3 text-xs text-muted-foreground italic">
                {isFree
                  ? "Download links will be activated as official materials become available."
                  : "Checkout functionality will be enabled when the commerce integration is configured."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related resources */}
      <section className="bg-muted/50 border-t border-border">
        <div className="container-span py-12">
          <h2 className="text-xl font-semibold text-primary mb-2">Related Resources</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Free educational materials that complement this product.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.filter((r) => r.placeholder).slice(0, 3).map((r) => (
              <Link
                key={r.id}
                href="/resources"
                className="bg-card rounded-xl p-5 border border-border hover:border-secondary/40 transition-all focus-ring"
              >
                <h3 className="font-semibold text-primary text-sm mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/resources"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all"
          >
            Browse all resources
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
