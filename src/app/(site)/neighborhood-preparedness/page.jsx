import NeighborhoodPreparedness from "@/views/NeighborhoodPreparedness";

export const metadata = {
  title: "Neighborhood Preparedness",
  description: "The SPAN process for organizing 15–20 households to respond together during the first hour after a disaster.",
  alternates: { canonical: "/neighborhood-preparedness" },
};

export default function Page() {
  return <NeighborhoodPreparedness />;
}
