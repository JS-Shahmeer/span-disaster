import { siteConfig } from "@/config/site";

// Canonical origin: explicit setting, else the Vercel production domain, else local dev.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "http://localhost:3000"
).replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path === "/" ? "" : path}`;

const socialProfiles = () => Object.values(siteConfig.social).filter(Boolean);

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${siteUrl}/#organization`,
    name: siteConfig.name,
    alternateName: "SPAN",
    url: siteUrl,
    logo: absoluteUrl("/icon.svg"),
    slogan: "Your Neighbors. Your Preparedness. Your First Response.",
    description:
      "SPAN Disaster Services is a 501(c)(3) nonprofit that helps neighborhoods of 15–20 households prepare, organize, and practice the skills needed to respond together during the critical first hour after a major disaster.",
    foundingDate: "2004",
    nonprofitStatus: "Nonprofit501c3",
    knowsAbout: [
      "Disaster preparedness",
      "Neighborhood emergency response",
      "Personal and household preparedness",
      "Community emergency organizing",
      "The golden hour after a disaster",
    ],
    ...(siteConfig.email && { email: siteConfig.email }),
    ...(socialProfiles().length && { sameAs: socialProfiles() }),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteConfig.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "en-US",
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd({ title, description, path, section }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    articleSection: section,
    inLanguage: "en-US",
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function productJsonLd(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    url: absoluteUrl(`/shop/${product.slug}`),
    brand: { "@type": "Brand", name: siteConfig.name },
    ...(product.price != null && {
      offers: {
        "@type": "Offer",
        price: product.price.toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: absoluteUrl(`/shop/${product.slug}`),
        seller: { "@id": `${siteUrl}/#organization` },
      },
    }),
  };
}
