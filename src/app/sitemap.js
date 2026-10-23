import { activities } from "@/data/activities";
import { meetings } from "@/data/meetings";
import { getProducts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

const staticPages = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/personal-preparedness", priority: 0.9 },
  { path: "/neighborhood-preparedness", priority: 0.9 },
  { path: "/resources", priority: 0.8 },
  { path: "/shop", priority: 0.7 },
  { path: "/contact", priority: 0.6 },
  { path: "/privacy", priority: 0.2 },
  { path: "/terms", priority: 0.2 },
  { path: "/accessibility", priority: 0.2 },
  { path: "/shipping", priority: 0.2 },
];

export default async function sitemap() {
  const products = await getProducts();
  return [
    ...staticPages.map(({ path, priority }) => ({ url: absoluteUrl(path), changeFrequency: "monthly", priority })),
    ...meetings.map((m) => ({ url: absoluteUrl(`/neighborhood-preparedness/${m.slug}`), changeFrequency: "monthly", priority: 0.8 })),
    ...activities.map((a) => ({ url: absoluteUrl(`/personal-preparedness/${a.slug}`), changeFrequency: "monthly", priority: 0.7 })),
    ...products.map((p) => ({ url: absoluteUrl(`/shop/${p.slug}`), changeFrequency: "weekly", priority: 0.6 })),
  ];
}
