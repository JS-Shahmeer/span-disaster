import Link from "next/link";
import { ArrowRight, ListOrdered, MessageSquare, Footprints, House, Zap, Package, HeartPulse, Flame, Users, PawPrint } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTASection from "@/components/shared/CTASection";
import { meetings } from "@/data/meetings";
import { Image } from "@/components/ui/image";

const walkImage = "https://media.base44.com/images/public/6acfc11b88787a633a2cb9f6/03539d475_generated_9c7fb6dc.png";

const iconMap = { ListOrdered, MessageSquare, Footprints, House, Zap };

export default function NeighborhoodPreparedness() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="container-span py-14 lg:py-20">
          <div className="max-w-3xl">
            <div className="eyebrow mb-4">Neighborhood Preparedness</div>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-primary text-balance">
              A prepared neighborhood is more than a collection of prepared homes.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              When emergency responders are unavailable, the people most likely to help you are the
              people already around you. SPAN helps 15–20 households organize, learn, and practice
              together as a neighborhood response team.
            </p>
            <Link
              href="/neighborhood-preparedness/first-meeting"
              className="mt-8 inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]"
            >
              Explore the Five Meetings
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why neighbors matter */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              { title: "Why neighbors matter", body: "In a disaster, professional responders may not reach your neighborhood during the first hour. The people nearest to you are the ones who can act fastest." },
              { title: "Why it's a process", body: "Preparedness is not a one-time checklist. It is a continuing practice of learning, organizing, and drilling together so skills stay sharp." },
              { title: "How it connects", body: "Personal preparedness makes your household ready. Neighborhood preparedness connects ready households into an organized team that can respond together." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9-Step Response Plan */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="The 9-Step Response Plan"
                title="A shared plan for the first hour."
                description="The 9-Step Response Plan gives every neighbor the same sequence of actions to follow during the critical first hour after a disaster. When everyone knows the plan, the neighborhood responds as a coordinated team."
              />
              <div className="mt-6 flex items-start gap-3 bg-card rounded-xl p-5 border border-border">
                <ListOrdered className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The nine official steps, their names, and detailed instructions will be provided
                  from the supplied SPAN materials. The plan is introduced in the First Meeting and
                  practiced throughout all five meetings.
                </p>
              </div>
              <Link href="/neighborhood-preparedness/first-meeting" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:gap-3 transition-all">
                Learn the plan in Meeting 1
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <div key={num} className="aspect-square bg-card rounded-xl border border-border flex items-center justify-center">
                  <span className="font-mono text-2xl font-semibold text-primary/30">{num}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four Response Teams */}
      <section className="bg-card border-y border-border">
        <div className="container-span py-16 lg:py-20">
          <SectionHeading
            eyebrow="The Four Disaster Response Teams"
            title="Organized neighbors check on every household."
            description="The Four Disaster Response Teams divide the neighborhood's response into focused roles. Each team checks households for specific concerns and reports back to the neighborhood gathering site."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: HeartPulse, focus: "Injuries & First Aid" },
              { icon: Flame, focus: "Gas Leaks & Fire" },
              { icon: Users, focus: "Vulnerable Residents" },
              { icon: PawPrint, focus: "Pets & Animals" },
            ].map((team, i) => (
              <div key={i} className="bg-background rounded-xl p-5 border border-border">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-3">
                  <team.icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">Team {i + 1}</div>
                <h3 className="font-semibold text-primary text-sm">{team.focus}</h3>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground italic max-w-3xl">
            Official team names, detailed assignments, and operational instructions will be
            populated from the supplied SPAN materials. Teams are introduced in the First Meeting.
          </p>
        </div>
      </section>

      {/* Five meetings process */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-24">
          <SectionHeading
            eyebrow="The Five Meetings"
            title="A progressive path from learning to practice."
            description="Each meeting builds on the last. Together they move a neighborhood from understanding the plan to running a full functional drill."
            align="center"
          />
          <div className="mt-12 grid gap-4">
            {meetings.map((m) => {
              const Icon = iconMap[m.icon] || ListOrdered;
              return (
                <Link
                  key={m.slug}
                  href={`/neighborhood-preparedness/${m.slug}`}
                  className="group flex items-center gap-5 bg-card rounded-xl p-6 border border-border hover:border-secondary/40 hover:shadow-md transition-all focus-ring"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-mono font-semibold">
                    {m.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-secondary" />
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Meeting {m.number}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary">{m.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{m.short}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Neighborhood Supplies Kit */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container-span py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="The Neighborhood Supplies Kit"
                title="Shared equipment for a coordinated response."
                description="The Neighborhood Supplies Kit is a collection of equipment that supports the neighborhood's organized response during the first hour. It is used during the Functional Drill and in an actual disaster."
              />
              <div className="mt-6 flex items-start gap-3 bg-card rounded-xl p-5 border border-border">
                <Package className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The complete contents of the kit will be documented using the supplied official
                  SPAN materials. Typically it includes tools, first aid supplies, communication
                  equipment, and items needed to support the Four Response Teams.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={walkImage}
                alt="Neighbors walking together through a residential street during a preparedness exercise"
                className="w-full h-[320px] lg:h-[400px]"
                fittingType="fill"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ongoing Preparedness */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-20">
          <SectionHeading
            eyebrow="Ongoing Preparedness"
            title="Preparedness is a practice, not a checklist."
            description="After the five meetings, a prepared neighborhood continues to practice, welcome new neighbors, and keep skills sharp. Regular drills and refreshers ensure the team stays ready."
            align="center"
          />
          <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Repeat the Drill", desc: "Revisit the Functional Drill periodically to keep response skills current and build muscle memory." },
              { num: "02", title: "Welcome New Neighbors", desc: "Introduce new households to the plan, teams, and supplies. Bring them into the next round of meetings." },
              { num: "03", title: "Refresh Supplies", desc: "Check and rotate the Neighborhood Supplies Kit. Update contact information and household scenarios." },
            ].map((item) => (
              <div key={item.num} className="bg-card rounded-xl p-6 border border-border">
                <div className="font-mono text-sm text-secondary font-semibold mb-2">{item.num}</div>
                <h3 className="font-semibold text-primary mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Get Started"
        title="Begin with the 9-Step Response Plan and the Four Response Teams."
        primaryLabel="Start with Meeting 1"
        primaryTo="/neighborhood-preparedness/first-meeting"
        secondaryLabel="Browse Resources"
        secondaryTo="/resources"
      />
    </>
  );
}
