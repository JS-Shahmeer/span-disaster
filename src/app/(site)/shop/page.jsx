import Shop from "@/views/Shop";
import { getProducts } from "@/lib/content";


export const metadata = {
  title: "Shop",
  description: "SPAN workbooks, preparedness products, and educational materials.",
  alternates: { canonical: "/shop" },
};

export default async function Page() {
  return <Shop products={await getProducts()} />;
}
