import Home from "@/views/Home";
import { getResources } from "@/lib/content";

export const revalidate = 300;

export const metadata = { alternates: { canonical: "/" } };

export default async function Page() {
  return <Home resources={await getResources()} />;
}
