import Link from "next/link";
import { ArrowRight, House, MapPin, Check, ClipboardCheck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import MeetingNav from "@/components/neighborhood/MeetingNav";

const sixSteps = Array.from({ length: 6 }, (_, i) => ({
  num: i + 1,
  title: `Step ${i + 1}`,
  description: "The official step instructions will be provided from the supplied SPAN materials.",
}));

export default function Responder101() {
  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-12 lg:py-16">
          <Link href="/neighborhood-preparedness" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
            ← Neighborhood Preparedness
          </Link>
          <div className="eyebrow mb-3">Meeting 4 of 5</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary text-balance">
            Responder 101 Exercise
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Participants start at home, practice the first six steps of the 9-Step Response Plan,
            and report to the Neighborhood Gathering Site. This exercise builds familiarity with
            the process in a low-pressure setting before a real disaster occurs.
          </p>
        </div>
      </section>

      {/* Exercise overview */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-12">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: House, title: "Start at Home", desc: "Each participant begins the exercise in their own home." },
              { icon: ClipboardCheck, title: "Practice 6 Steps", desc: "Work through the first six steps of the 9-Step Response Plan." },
              { icon: MapPin, title: "Report to Gathering Site", desc: "Leave home and report to the Neighborhood Gathering Site." },
            ].map((s, i) => (
              <div key={s.title} className="bg-background rounded-xl p-6 border border-border">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-1">Phase {i + 1}</div>
                <h3 className="font-semibold text-primary mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six steps */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-20">
          <SectionHeading
            eyebrow="The First Six Steps"
            title="Practice the initial response from your own home."
            description="Participants work through the first six steps of the 9-Step Response Plan individually, then report to the Neighborhood Gathering Site to debrief together."
          />
          <div className="mt-10 space-y-3 max-w-3xl">
            {sixSteps.map((step) => (
              <div key={step.num} className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono font-semibold text-sm">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1 italic">{step.description}</p>
                </div>
                <Check className="h-5 w-5 text-border shrink-0 mt-1" />
              </div>
            ))}
            <div className="flex items-start gap-4 bg-secondary/5 rounded-xl p-5 border border-secondary/20">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Report to the Neighborhood Gathering Site</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1 italic">
                  The location and reporting procedure for the Neighborhood Gathering Site will be
                  defined using the supplied SPAN materials.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic max-w-3xl">
            The official six steps and reporting procedure will be populated from the supplied
            SPAN materials. Approved instructions and checklists will be included when available.
          </p>
        </div>
      </section>

      {/* Debrief */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container-span py-14">
          <SectionHeading eyebrow="Debrief" title="Discuss what you learned." />
          <div className="mt-6 space-y-3 max-w-2xl">
            {[
              "What did the first six steps feel like when practiced from home?",
              "Was it clear what to do at each step, or where did you feel uncertain?",
              "How long did it take to complete the steps and reach the gathering site?",
              "What would you do differently in a real disaster?",
            ].map((q, i) => (
              <div key={i} className="flex items-start gap-3 bg-card rounded-lg p-4 border border-border">
                <span className="text-secondary font-mono font-semibold shrink-0">Q{i + 1}.</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-span py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ready for the full simulation?</h2>
          <Link href="/neighborhood-preparedness/functional-drill" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]">
            Continue to the Functional Drill
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MeetingNav currentSlug="responder-101" />
    </>
  );
}
