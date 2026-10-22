import { redirect } from "next/navigation";
import ProductDetail from "@/views/ProductDetail";
import JsonLd from "@/components/JsonLd";
import { getProductBySlug, getProducts, getResources } from "@/lib/content";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description, alternates: { canonical: `/shop/${slug}` } };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) redirect("/shop");
  return (
    <>
      <JsonLd
        data={[
          productJsonLd(product),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/shop/${slug}` },
          ]),
        ]}
      />
      <ProductDetail product={product} resources={await getResources()} />
    </>
  );
}
