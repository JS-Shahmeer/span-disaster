import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { milestones } from "@/data/milestones";

export default function Experience() {
  return (
    <section className="bg-muted/50 border-y border-border">
      <div className="container-span py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Proven Experience"
              title="A methodology tested over decades."
              description="The SPAN approach has evolved through multiple emergency management programs since 1986 and has been applied during real disasters."
            />
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:gap-3 transition-all"
            >
              Read the full history
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <div className="relative pl-6 border-l-2 border-border space-y-6">
              {milestones.map((m) => (
                <div key={m.year + m.program} className="relative">
                  <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-accent-ink border-4 border-muted/50" />
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <span className="font-mono text-sm font-bold text-secondary">{m.year}{m.endYear ? `–${m.endYear}` : ""}</span>
                    <span className="text-sm font-medium text-muted-foreground">{m.context}</span>
                  </div>
                  <h3 className="mt-1 text-base font-semibold text-primary">{m.program} · {m.location}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
