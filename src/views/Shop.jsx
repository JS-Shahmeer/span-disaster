"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, Package, FileText, ShieldCheck, ShoppingCart, Download, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTASection from "@/components/shared/CTASection";
import { productCategories } from "@/data/products";
import { Image } from "@/components/ui/image";

const workbookImage = "https://media.base44.com/images/public/6acfc11b88787a633a2cb9f6/8f3366411_generated_8e7872c5.png";

const categoryIcons = {
  workbook: BookOpen,
  personal: Package,
  educational: FileText,
  free: Download,
};

export default function Shop({ products }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products.filter((p) => p.category !== "free");
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  const freeProducts = products.filter((p) => p.category === "free");
  const featured = products.find((p) => p.category === "workbook") ?? products[0];

  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-14 lg:py-20">
          <SectionHeading
            eyebrow="The Storefront"
            title="Educational resources and preparedness products."
            description="A small, mission-aligned selection of tools to support your preparedness journey. Every purchase supports the SPAN program."
          />
        </div>
      </section>

      {/* Featured workbook */}
      {featured && (
      <section className="bg-card border-b border-border">
        <div className="container-span py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-muted">
              <Image
                src={workbookImage}
                alt="The SPAN Workbook open on a table"
                className="w-full h-[360px] lg:h-[440px]"
                fittingType="fill"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider mb-4">
                <ShieldCheck className="h-3.5 w-3.5" />
                Core Resource
              </div>
              <h2 className="text-3xl font-semibold text-primary mb-3">The SPAN Workbook</h2>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {featured.description}
              </p>
              <ul className="space-y-2 mb-6">
                {featured.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-secondary mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-lg font-semibold text-primary">{featured.priceNote}</span>
                <span className="text-sm text-muted-foreground">· {featured.format} · {featured.delivery}</span>
              </div>
              <button
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-base font-semibold hover:bg-primary/90 transition-all focus-ring min-h-[48px]"
                disabled
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <p className="mt-3 text-xs text-muted-foreground italic">
                Checkout functionality will be enabled when the commerce integration is configured.
              </p>
              <Link
                href={`/shop/${featured.slug}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all"
              >
                View full details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Category filter + products */}
      <section className="bg-background">
        <div className="container-span py-16">
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring ${
                activeCategory === "all" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:bg-muted"
              }`}
            >
              All Products
            </button>
            {productCategories.filter((c) => c.id !== "free").map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring ${
                  activeCategory === cat.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <Link key={p.id} href={`/shop/${p.slug}`} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md hover:border-secondary/40 transition-all flex flex-col focus-ring">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
                    {(() => {
                      const Icon = categoryIcons[p.category] || Package;
                      return <Icon className="h-8 w-8" />;
                    })()}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  {p.badge && (
                    <span className="inline-block self-start text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary/10 text-secondary mb-3">
                      {p.badge}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-primary mb-2">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                  <ul className="space-y-1.5 mb-5">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-secondary mt-0.5">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-primary">{p.priceNote}</span>
                      <span className="text-xs text-muted-foreground">{p.format}</span>
                    </div>
                    <button
                      className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all focus-ring min-h-[44px]"
                      disabled
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {p.price === 0 ? "Download Free" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground italic">
            Prices, inventory, and shipping details will be confirmed when products are finalized.
            Do not treat placeholder prices as final.
          </p>
        </div>
      </section>

      {/* Free handouts section */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container-span py-16">
          <SectionHeading
            eyebrow="Always Free"
            title="Free handouts and downloadable resources."
            description="These educational materials are always free, separate from paid products."
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {freeProducts.map((p) => (
              <div key={p.id} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10 text-secondary mb-4">
                  <Download className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-primary mb-1.5">{p.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                <button className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all" disabled>
                  <Download className="h-4 w-4" />
                  Download Free
                </button>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">
            Download links will be activated as official materials become available.
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="Learn First"
        title="Products work best when paired with the SPAN process."
        primaryLabel="Explore Neighborhood Preparedness"
        primaryTo="/neighborhood-preparedness"
        secondaryLabel="Start Personal Preparedness"
        secondaryTo="/personal-preparedness"
      />
    </>
  );
}
