import Link from "next/link";
import { ArrowRight, ListOrdered, Users, CalendarCheck, ClipboardList } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const methods = [
  {
    icon: ListOrdered,
    title: "The 9-Step Response Plan",
    description: "A structured sequence of actions that guides neighborhoods through the first hour after a disaster.",
    to: "/neighborhood-preparedness/first-meeting",
    label: "Explore the plan",
  },
  {
    icon: Users,
    title: "The Four Response Teams",
    description: "Specialized neighborhood teams that check households for injuries, gas leaks, fire, and vulnerable neighbors.",
    to: "/neighborhood-preparedness/first-meeting",
    label: "Meet the teams",
  },
  {
    icon: CalendarCheck,
    title: "Five Neighborhood Meetings",
    description: "A progressive series of meetings and exercises that build skills through discussion, walking, and drilling.",
    to: "/neighborhood-preparedness",
    label: "See the meetings",
  },
  {
    icon: ClipboardList,
    title: "12 Personal Preparedness Activities",
    description: "Practical, step-by-step activities that help individuals and households build readiness one skill at a time.",
    to: "/personal-preparedness",
    label: "Start the activities",
  },
];

export default function SpanMethod() {
  return (
    <section className="bg-card border-y border-border">
      <div className="container-span py-16 lg:py-24">
        <SectionHeading
          eyebrow="The SPAN Method"
          title="A structured, practical, repeatable process."
          description="SPAN provides a clear path from individual readiness to organized neighborhood response. Each element connects to the next."
        />
        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {methods.map((m) => (
            <Link
              key={m.title}
              href={m.to}
              className="group flex items-start gap-5 bg-background rounded-xl p-6 border border-border hover:border-secondary/40 hover:shadow-md transition-all focus-ring"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <m.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary mb-1.5">{m.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{m.description}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-secondary group-hover:gap-2.5 transition-all">
                  {m.label}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
