import Resources from "@/views/Resources";
import { getResources } from "@/lib/content";

export const revalidate = 300;

export const metadata = {
  title: "Resources",
  description: "Free preparedness handouts, graphics, videos, and materials from SPAN.",
};

export default async function Page() {
  return <Resources resources={await getResources()} />;
}
