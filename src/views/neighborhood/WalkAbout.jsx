import Link from "next/link";
import { ArrowRight, Footprints, Map, ShieldAlert, Users } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import MeetingNav from "@/components/neighborhood/MeetingNav";

const householdCards = [
  "Household with an older resident who may need mobility assistance",
  "Household with children who may be home alone after school",
  "Household with pets that may need attention",
  "Household with a known gas meter location to document",
];

export default function WalkAbout() {
  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-12 lg:py-16">
          <Link href="/neighborhood-preparedness" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
            ← Neighborhood Preparedness
          </Link>
          <div className="eyebrow mb-3">Meeting 3 of 5</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary text-balance">
            Walk-About Exercise
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Participants walk through their neighborhood together, identify the locations of gas
            meters, discuss a scenario or problem associated with each household, and learn how
            the Four Response Teams would respond.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Map, title: "Walk the Neighborhood", desc: "Participants walk together through the neighborhood as a group." },
              { icon: Footprints, title: "Identify Gas Meters", desc: "Locate and document the position of gas meters at each household." },
              { icon: Users, title: "Discuss Scenarios", desc: "Discuss a scenario or problem associated with each household along the route." },
              { icon: ShieldAlert, title: "Plan Team Responses", desc: "Learn how the Four Response Teams would respond to each situation." },
            ].map((step, i) => (
              <div key={step.title} className="bg-background rounded-xl p-5 border border-border">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary mb-3">
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-1">Step {i + 1}</div>
                <h3 className="font-semibold text-primary text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-20">
          <SectionHeading
            eyebrow="Neighborhood Map"
            title="A visual guide to your neighborhood's resources and hazards."
            description="An illustrated neighborhood map helps participants understand the layout, identify utility locations, and plan response routes."
          />
          <div className="mt-10 bg-muted/40 rounded-2xl border-2 border-dashed border-border p-12 lg:p-20 text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-card border border-border mb-4">
              <Map className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">Neighborhood Map Placeholder</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              An illustrated neighborhood map and gas meter identification visual will be added
              from the supplied SPAN materials.
            </p>
          </div>
        </div>
      </section>

      {/* Household scenario cards */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container-span py-16">
          <SectionHeading
            eyebrow="Household Scenario Cards"
            title="Discussion prompts for each household."
            description="As the group walks, each household is discussed using scenario cards that prompt thinking about how the Four Response Teams would respond."
          />
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {householdCards.map((card, i) => (
              <div key={i} className="bg-card rounded-xl p-5 border border-border flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{card}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety reminder */}
      <section className="bg-background">
        <div className="container-span py-12">
          <div className="bg-destructive/5 rounded-xl p-6 border-2 border-destructive/20 flex items-start gap-4">
            <ShieldAlert className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-primary mb-1">Privacy & Safety Reminder</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Do not publish residents' private information, sensitive household
                vulnerabilities, or identifiable utility information on a public website. Any
                actual neighborhood mapping or household records should be handled through
                appropriate private processes within the neighborhood group.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-span py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Ready to practice from home?</h2>
          <Link href="/neighborhood-preparedness/responder-101" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]">
            Continue to Responder 101
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MeetingNav currentSlug="walk-about" />
    </>
  );
}
