import Link from "next/link";
import { ArrowRight, Zap, Package, Mail, RefreshCw, Users } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import MeetingNav from "@/components/neighborhood/MeetingNav";

export default function FunctionalDrill() {
  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-12 lg:py-16">
          <Link href="/neighborhood-preparedness" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
            ← Neighborhood Preparedness
          </Link>
          <div className="eyebrow mb-3">Meeting 5 of 5</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-primary text-balance">
            Functional Drill
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            The Functional Drill is the culmination of the neighborhood preparedness program.
            Mystery Envelopes introduce unknown aspects of a simulated disaster, and participants
            use the Neighborhood Supplies Kit and the approved response methodology to work
            through the scenario as a team.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-12">
          <h2 className="text-xl font-semibold text-primary mb-5">Exercise Objectives</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Apply the full response methodology in a simulated disaster scenario.",
              "Use the Neighborhood Supplies Kit as part of the exercise.",
              "Work as a team to manage unknown elements introduced by Mystery Envelopes.",
              "Debrief and reinforce learning through structured practice.",
            ].map((obj, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold mt-0.5">{i + 1}</div>
                <p className="text-muted-foreground leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mystery Envelopes */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="The Mystery Envelope Concept"
                title="Unknown elements that test real response."
                description="Mystery Envelopes introduce unexpected problems and scenarios into the drill, simulating the unpredictability of a real disaster. Participants must adapt and respond using the skills they have practiced."
              />
              <div className="mt-6 space-y-3">
                {[
                  { icon: Mail, text: "Envelopes are opened at designated points during the drill." },
                  { icon: Zap, text: "Each envelope introduces a new problem or complication." },
                  { icon: Users, text: "The neighborhood team must respond using the 9-Step Plan and Four Response Teams." },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted/40 rounded-2xl border-2 border-dashed border-border p-12 text-center">
              <div className="flex h-20 w-16 mx-auto items-center justify-center rounded-lg bg-card border-2 border-secondary/40 mb-4 rotate-3">
                <Mail className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-sm text-muted-foreground italic">
                Mystery Envelope visual placeholder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Supplies Kit role */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container-span py-16">
          <div className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border max-w-3xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">The Neighborhood Supplies Kit</h3>
              <p className="text-muted-foreground leading-relaxed">
                During the Functional Drill, participants use the Neighborhood Supplies Kit just as
                they would in a real disaster. This gives the team hands-on experience locating and
                using the equipment under simulated pressure. The complete kit contents will be
                documented from the supplied SPAN materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Debrief */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-20">
          <SectionHeading
            eyebrow="Debrief"
            title="Practice reinforces learning."
            description="After the drill, the group debriefs to discuss what went well, what was challenging, and what to improve. This is where practice becomes lasting readiness."
            align="center"
          />
          <div className="mt-10 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: RefreshCw, title: "Review", desc: "Discuss how the team applied the 9-Step Plan and Four Response Teams." },
              { icon: Users, title: "Reflect", desc: "Share what each person learned and where they felt uncertain." },
              { icon: Zap, title: "Improve", desc: "Identify changes to make before the next drill or a real disaster." },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-xl p-6 border border-border text-center">
                <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground italic max-w-2xl mx-auto">
            Clearly distinguish simulated activities from actual emergency guidance. The drill is
            practice only—always contact 911 when emergency services are available and appropriate.
          </p>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-span py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">Keep practicing and stay ready.</h2>
          <Link href="/resources" className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]">
            Explore Resources and Continue Practicing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <MeetingNav currentSlug="functional-drill" />
    </>
  );
}
