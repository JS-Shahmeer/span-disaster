import { redirect } from "next/navigation";
import ActivityDetail from "@/views/ActivityDetail";
import { activities, getActivityBySlug } from "@/data/activities";

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  return activity ? { title: activity.title, description: activity.summary } : {};
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!getActivityBySlug(slug)) redirect("/personal-preparedness");
  return <ActivityDetail slug={slug} />;
}
