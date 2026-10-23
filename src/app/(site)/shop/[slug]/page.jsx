import { redirect } from "next/navigation";
import ProductDetail from "@/views/ProductDetail";
import { getProductBySlug, getProducts, getResources } from "@/lib/content";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) redirect("/shop");
  return <ProductDetail product={product} resources={await getResources()} />;
}
