import { Home, Users, Repeat } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const pillars = [
  {
    icon: Home,
    title: "Prepare Yourself & Your Household",
    description: "Build practical skills and supplies so your household is ready to act, not just stocked.",
  },
  {
    icon: Users,
    title: "Organize with Your Neighbors",
    description: "A neighborhood of 15–20 households can work together as an organized response team.",
  },
  {
    icon: Repeat,
    title: "Practice Until You Know What to Do",
    description: "Preparedness is a continuing process. Practice connects learning to real action.",
  },
];

export default function Pillars() {
  return (
    <section className="bg-background">
      <div className="container-span py-16 lg:py-24">
        <SectionHeading
          eyebrow="More Than Supplies"
          title="Preparedness is about knowing what to do."
          description="Collecting emergency supplies is only the beginning. Real preparedness means learning, organizing, and practicing effective response together."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="relative bg-card rounded-xl p-7 border border-border hover:border-secondary/40 transition-colors"
            >
              <div className="absolute top-7 right-7 font-mono text-sm text-border font-semibold">
                0{i + 1}
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-5">
                <pillar.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2 leading-snug">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
