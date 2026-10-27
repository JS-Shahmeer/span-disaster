import "server-only";
import { products } from "@/data/products";
import { resources } from "@/data/resources";

// Products and resources are edited in src/data. These stay async so pages
// don't change if a content source is added later.
export async function getProducts() {
  return products;
}

export async function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getResources() {
  return resources;
}
