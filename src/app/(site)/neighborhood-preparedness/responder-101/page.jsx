import Responder101 from "@/views/neighborhood/Responder101";
import JsonLd from "@/components/JsonLd";
import { getMeetingBySlug } from "@/data/meetings";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const meeting = getMeetingBySlug("responder-101");
const path = "/neighborhood-preparedness/responder-101";

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
      <Responder101 />
    </>
  );
}
