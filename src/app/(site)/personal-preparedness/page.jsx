import PersonalPreparedness from "@/views/PersonalPreparedness";

export const metadata = {
  title: "Personal Preparedness",
  description: "Twelve practical preparedness activities to get your household ready for a disaster.",
  alternates: { canonical: "/personal-preparedness" },
};

export default function Page() {
  return <PersonalPreparedness />;
}
