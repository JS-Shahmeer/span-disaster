"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, MessageSquare, Lightbulb } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import MeetingNav from "@/components/neighborhood/MeetingNav";

const problems = Array.from({ length: 10 }, (_, i) => ({
  num: i + 1,
  problem: `Problem ${i + 1}`,
  problemDesc: "A realistic problem that may occur during the neighborhood disaster scenario. The specific problem will be provided from the supplied SPAN materials.",
  solution: `Expert Solution ${i + 1}`,
  solutionDesc: "A corresponding solution provided by subject matter experts. The specific solution will be provided from the supplied SPAN materials.",
}));

export default function TableTop() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-12 lg:py-16">
          <Link href="/neighborhood-preparedness" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
            ← Neighborhood Preparedness
          </Link>
          <div className="eyebrow mb-3">Meeting 2 of 5</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary text-balance">
            Table Top Exercise
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Participants review a realistic neighborhood disaster scenario, discuss ten problems
            that have occurred within the scenario, and examine ten corresponding solutions
            provided by subject matter experts. This structured discussion builds group
            decision-making skills.
          </p>
        </div>
      </section>

      {/* Scenario intro */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-12">
          <div className="flex items-start gap-4 bg-background rounded-xl p-6 border border-border">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">The Scenario</h2>
              <p className="text-muted-foreground leading-relaxed">
                The exercise begins with a realistic disaster scenario affecting the neighborhood.
                Participants work through the scenario together, identifying problems and
                discussing how the 9-Step Response Plan and Four Response Teams would address each
                one. The official scenario will be provided from the supplied SPAN materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems & Solutions */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-20">
          <SectionHeading
            eyebrow="Ten Problems · Ten Solutions"
            title="Discuss each problem, then reveal the expert solution."
            description="Click each problem card to expand and reveal the corresponding expert solution. Use these as discussion prompts for your neighborhood group."
          />
          <div className="mt-10 space-y-3 max-w-3xl">
            {problems.map((p) => {
              const isOpen = open === p.num;
              return (
                <div key={p.num} className="bg-card rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : p.num)}
                    className="w-full flex items-center gap-4 p-5 text-left focus-ring hover:bg-muted/30 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono font-semibold text-sm">
                      {p.num}
                    </div>
                    <span className="flex-1 font-semibold text-primary">{p.problem}</span>
                    <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pl-[4.5rem] space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono uppercase tracking-wider text-destructive">Problem</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">{p.problemDesc}</p>
                      </div>
                      <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Lightbulb className="h-4 w-4 text-secondary" />
                          <span className="text-xs font-mono uppercase tracking-wider text-secondary">Expert Solution</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">{p.solutionDesc}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic max-w-3xl">
            The ten problems and ten expert solutions will be populated from approved SPAN content.
            Facilitator notes and participant prompts will be included when materials are supplied.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-span py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ready to take it outside?</h2>
          <Link href="/neighborhood-preparedness/walk-about" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]">
            Continue to the Walk-About Exercise
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MeetingNav currentSlug="table-top" />
    </>
  );
}
