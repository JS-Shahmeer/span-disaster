import { redirect } from "next/navigation";
import ProductDetail from "@/views/ProductDetail";
import { products, getProductBySlug } from "@/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!getProductBySlug(slug)) redirect("/shop");
  return <ProductDetail slug={slug} />;
}
