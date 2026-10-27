import { redirect } from "next/navigation";
import ActivityDetail from "@/views/ActivityDetail";
import JsonLd from "@/components/JsonLd";
import { activities, getActivityBySlug } from "@/data/activities";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) return {};
  return {
    title: activity.title,
    description: activity.summary,
    alternates: { canonical: `/personal-preparedness/${slug}` },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) redirect("/personal-preparedness");
  const path = `/personal-preparedness/${slug}`;
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({ title: activity.title, description: activity.summary, path, section: "Personal Preparedness" }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Personal Preparedness", path: "/personal-preparedness" },
            { name: activity.title, path },
          ]),
        ]}
      />
      <ActivityDetail slug={slug} />
    </>
  );
}
