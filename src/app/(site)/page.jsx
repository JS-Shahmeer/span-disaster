import Home from "@/views/Home";
import { getResources } from "@/lib/content";


export const metadata = { alternates: { canonical: "/" } };

export default async function Page() {
  return <Home resources={await getResources()} />;
}
