import Link from "next/link";
import { ArrowRight, AlertTriangle, ShieldCheck, Users, HeartPulse, Flame, Baby, Accessibility, PawPrint } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import MeetingNav from "@/components/neighborhood/MeetingNav";

const nineSteps = Array.from({ length: 9 }, (_, i) => ({
  num: i + 1,
  title: `Step ${i + 1}`,
  description: "The official step name and detailed instructions will be provided from the supplied SPAN materials.",
}));

const teams = [
  {
    num: 1,
    name: "Response Team 1",
    color: "bg-secondary/10 text-secondary",
    responsibilities: ["Checking households for injuries", "Providing basic first aid"],
    icon: HeartPulse,
  },
  {
    num: 2,
    name: "Response Team 2",
    color: "bg-secondary/10 text-secondary",
    responsibilities: ["Checking for natural gas leaks", "Fire safety assessment"],
    icon: Flame,
  },
  {
    num: 3,
    name: "Response Team 3",
    color: "bg-primary/10 text-primary",
    responsibilities: ["Checking on children who may be home alone", "Checking on older adults and people with mobility challenges"],
    icon: Baby,
  },
  {
    num: 4,
    name: "Response Team 4",
    color: "bg-chart-4/15 text-chart-4",
    responsibilities: ["Checking on pets and animals", "Supporting overall neighborhood coordination"],
    icon: PawPrint,
  },
];

export default function FirstMeeting() {
  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-12 lg:py-16">
          <Link href="/neighborhood-preparedness" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
            ← Neighborhood Preparedness
          </Link>
          <div className="eyebrow mb-3">Meeting 1 of 5</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary text-balance">
            The 9-Step Response Plan & Four Response Teams
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            This first meeting introduces the foundational concepts used throughout the neighborhood
            program: the 9-Step Response Plan that guides action during the first hour, and the Four
            Disaster Response Teams that organize how neighbors check on one another.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-12">
          <h2 className="text-xl font-semibold text-primary mb-5">Meeting Objectives</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Understand the purpose of the 9-Step Response Plan and how it guides action during the first hour.",
              "Learn the Four Disaster Response Teams and their roles.",
              "Understand how households and neighbors work together.",
              "Recognize that team members follow safety procedures and do not replace professional responders.",
            ].map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold mt-0.5">{i + 1}</div>
                <p className="text-muted-foreground leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9-Step Plan */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-20">
          <SectionHeading
            eyebrow="The 9-Step Response Plan"
            title="A structured sequence for the first hour."
            description="The plan guides neighborhoods through the critical first hour after a disaster, step by step. The official step names and detailed instructions will be populated from the supplied SPAN materials."
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nineSteps.map((step) => (
              <div key={step.num} className="bg-card rounded-xl p-6 border border-border relative">
                <div className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-mono font-semibold text-sm">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold text-primary mb-2 pr-12">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed italic">{step.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">
            The nine official steps, their names, and operational instructions will be supplied from
            the approved SPAN materials. Do not treat these placeholders as official guidance.
          </p>
        </div>
      </section>

      {/* Four Response Teams */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container-span py-16 lg:py-20">
          <SectionHeading
            eyebrow="The Four Response Teams"
            title="Neighbors organized to check on every household."
            description="The Four Response Teams divide the neighborhood's response into focused roles. Teams check households for concerns and report back to the neighborhood gathering site."
          />
          <div className="mt-12 grid sm:grid-cols-2 gap-5">
            {teams.map((team) => (
              <div key={team.num} className="bg-card rounded-xl p-7 border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${team.color}`}>
                    <team.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Team {team.num}</div>
                    <h3 className="text-lg font-semibold text-primary">{team.name}</h3>
                  </div>
                </div>
                <ul className="space-y-2">
                  {team.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-secondary mt-1">▸</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-card rounded-xl p-6 border-2 border-destructive/20">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">Important Safety Note</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Team members follow appropriate safety procedures. They do not enter unsafe
                  buildings, structures with suspected gas leaks, or burning buildings. They do
                  not replace trained emergency responders. Always contact 911 when emergency
                  services are available and appropriate.
                </p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic">
            Official team names, detailed assignments, and operational instructions will be
            populated from the supplied SPAN materials.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-span py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ready to put the plan into practice?</h2>
          <Link href="/neighborhood-preparedness/table-top" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]">
            Continue to the Table Top Exercise
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MeetingNav currentSlug="first-meeting" />
    </>
  );
}
