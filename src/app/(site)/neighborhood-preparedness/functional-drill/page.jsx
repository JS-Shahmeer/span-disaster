import FunctionalDrill from "@/views/neighborhood/FunctionalDrill";
import JsonLd from "@/components/JsonLd";
import { getMeetingBySlug } from "@/data/meetings";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const meeting = getMeetingBySlug("functional-drill");
const path = "/neighborhood-preparedness/functional-drill";

export const metadata = {
  title: meeting.title,
  description: meeting.description,
  alternates: { canonical: path },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({ title: meeting.title, description: meeting.description, path, section: "Neighborhood Preparedness" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Neighborhood Preparedness", path: "/neighborhood-preparedness" },
            { name: meeting.title, path },
          ]),
        ]}
      />
      <FunctionalDrill />
    </>
  );
}
