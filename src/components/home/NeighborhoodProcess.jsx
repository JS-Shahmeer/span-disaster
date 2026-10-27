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
          {/* Vertical line: through the badges on mobile, down the center on desktop */}
          <div className="absolute left-7 sm:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" aria-hidden="true" />
          <ol className="space-y-8 sm:space-y-6">
            {stages.map((stage, i) => {
              const onLeft = i % 2 === 0;
              return (
                <li key={stage.num}>
                  <Link
                    href={stage.to}
                    className="relative grid grid-cols-[3.5rem_1fr] items-start gap-5 sm:grid-cols-[1fr_3.5rem_1fr] sm:gap-8 group focus-ring rounded-lg"
                  >
                    <div className="relative z-10 row-start-1 col-start-1 sm:col-start-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono font-semibold text-sm border-4 border-background">
                      {stage.num}
                    </div>
                    <div className={`row-start-1 col-start-2 pt-2 ${onLeft ? "sm:col-start-1 sm:text-right" : "sm:col-start-3"}`}>
                      <StageContent stage={stage} />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function StageContent({ stage }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-primary mb-1">{stage.title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm mb-2">{stage.description}</p>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
        View meeting
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  );
}
