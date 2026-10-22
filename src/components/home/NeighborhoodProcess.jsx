import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const stages = [
  { num: "01", title: "First Meeting", description: "Learn the 9-Step Response Plan and the Four Response Teams.", to: "/neighborhood-preparedness/first-meeting" },
  { num: "02", title: "Table Top Exercise", description: "Discuss realistic neighborhood problems and expert-provided solutions.", to: "/neighborhood-preparedness/table-top" },
  { num: "03", title: "Walk-About Exercise", description: "Explore the neighborhood and discuss household scenarios.", to: "/neighborhood-preparedness/walk-about" },
  { num: "04", title: "Responder 101 Exercise", description: "Practice the initial response steps and reporting to the Neighborhood Gathering Site.", to: "/neighborhood-preparedness/responder-101" },
  { num: "05", title: "Functional Drill", description: "Practice a simulated response using Mystery Envelopes and the Neighborhood Supplies Kit.", to: "/neighborhood-preparedness/functional-drill" },
];

export default function NeighborhoodProcess() {
  return (
    <section className="bg-background">
      <div className="container-span py-16 lg:py-24">
        <SectionHeading
          eyebrow="How It Works"
          title="Five meetings build a prepared neighborhood."
          description="Each meeting builds on the last, moving from learning to discussion to practice. Together they create a neighborhood that knows what to do."
        />
        <div className="mt-12 relative">
          {/* Vertical line */}
          <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-px bg-border sm:-translate-x-1/2" />
          <div className="space-y-8">
            {stages.map((stage, i) => (
              <Link
                key={stage.num}
                href={stage.to}
                className={`relative flex items-start gap-6 sm:gap-0 group focus-ring rounded-lg ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}
              >
                <div className="flex-1 sm:pr-8 sm:text-right hidden sm:block">
                  {i % 2 === 0 && <StageContent stage={stage} align="right" />}
                </div>
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono font-semibold text-sm border-4 border-background">
                  {stage.num}
                </div>
                <div className="flex-1 sm:pl-8">
                  <div className="sm:hidden">
                    <StageContent stage={stage} />
                  </div>
                  {i % 2 === 1 && <div className="hidden sm:block"><StageContent stage={stage} /></div>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageContent({ stage, align }) {
  return (
    <div className="group-hover:translate-x-0.5 transition-transform">
      <h3 className="text-lg font-semibold text-primary mb-1">{stage.title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm mb-2">{stage.description}</p>
      <span className={`inline-flex items-center gap-1 text-xs font-medium text-secondary ${align === "right" ? "sm:flex-row-reverse" : ""}`}>
        View meeting
        <ArrowRight className="h-3 w-3" />
      </span>
    </div>
  );
}
