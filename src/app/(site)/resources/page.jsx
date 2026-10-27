import Resources from "@/views/Resources";
import { getResources } from "@/lib/content";


export const metadata = {
  title: "Resources",
  description: "Free preparedness handouts, graphics, videos, and materials from SPAN.",
  alternates: { canonical: "/resources" },
};

export default async function Page() {
  return <Resources resources={await getResources()} />;
}
