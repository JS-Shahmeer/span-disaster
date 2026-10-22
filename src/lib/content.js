import "server-only";
import { prisma } from "@/lib/db";
import { products as staticProducts } from "@/data/products";
import { resources as staticResources } from "@/data/resources";

// Maps database rows to the same shape as src/data so the views stay unchanged.
function toProduct(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    description: row.description,
    features: row.features,
    price: row.priceCents == null ? null : row.priceCents / 100,
    priceNote: row.priceNote,
    format: row.format,
    delivery: row.delivery,
    image: row.image,
    badge: row.badge,
    intendedAudience: row.intendedAudience,
  };
}

function toResource(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    type: row.type,
    category: row.category,
    relatedActivity: row.relatedActivity,
    relatedMeeting: row.relatedMeeting,
    free: row.free,
    placeholder: row.placeholder,
    fileUrl: row.fileUrl,
    thumbnail: row.thumbnail,
    videoUrl: row.videoUrl,
    transcript: row.transcript,
  };
}

const byOrder = [{ sortOrder: "asc" }, { createdAt: "asc" }];

export async function getProducts() {
  if (!prisma) return staticProducts;
  const rows = await prisma.product.findMany({ where: { published: true }, orderBy: byOrder });
  return rows.map(toProduct);
}

export async function getProductBySlug(slug) {
  if (!prisma) return staticProducts.find((p) => p.slug === slug) ?? null;
  const row = await prisma.product.findFirst({ where: { slug, published: true } });
  return row ? toProduct(row) : null;
}

export async function getResources() {
  if (!prisma) return staticResources;
  const rows = await prisma.resource.findMany({ where: { published: true }, orderBy: byOrder });
  return rows.map(toResource);
}
