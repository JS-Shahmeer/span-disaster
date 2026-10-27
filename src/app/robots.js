import { absoluteUrl } from "@/lib/seo";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/cart", "/checkout"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
