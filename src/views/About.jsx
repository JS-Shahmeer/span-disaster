import Link from "next/link";
import { ArrowRight, Award, Building2, History, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTASection from "@/components/shared/CTASection";
import { milestones, evidenceEvents } from "@/data/milestones";
import { Image } from "@/components/ui/image";

const aboutImage = "https://media.base44.com/images/public/6acfc11b88787a633a2cb9f6/83bb2536f_generated_3951d717.png";

const values = [
  { icon: ShieldCheck, title: "Safety First", description: "Neighborhood volunteers follow safety procedures and never replace professional emergency responders." },
  { icon: Building2, title: "Community-Centered", description: "Preparedness is built on the relationships between the 15–20 households nearest to you." },
  { icon: History, title: "Field-Tested", description: "A methodology developed and refined through real emergency management programs since 1986." },
  { icon: Award, title: "Established & Credible", description: "A 501(c)(3) nonprofit with a track record across multiple programs and real disasters." },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="container-span py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="eyebrow mb-4">About SPAN</div>
              <h1 className="text-4xl sm:text-5xl font-semibold leading-tight text-primary text-balance">
                A trusted guide for capable, prepared neighbors.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                SPAN Disaster Services is a 501(c)(3) nonprofit corporation established in 2004.
                We help neighborhoods of 15–20 households prepare to become safe, organized, and
                effective disaster responders during the critical first hour following a major
                disaster.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={aboutImage}
                alt="Hands holding and pointing at a neighborhood map during a planning session"
                className="w-full h-[320px] lg:h-[400px]"
                fittingType="fill"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-card border-b border-border">
        <div className="container-narrow py-16 lg:py-20 text-center">
          <div className="eyebrow mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-accent-ink" />
            Our Mission
            <span className="h-px w-8 bg-accent-ink" />
          </div>
          <p className="text-2xl sm:text-3xl font-heading font-medium text-primary leading-relaxed text-balance">
            "Your Neighbors. Your Preparedness. Your First Response."
          </p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            When disaster strikes and 911 responders are overwhelmed, the first people who may be
            able to help are the people already around you. SPAN helps neighborhoods prepare,
            practice, and respond together.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-24">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Principles that guide everything we do."
            align="center"
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-muted/50 border-y border-border">
        <div className="container-span py-16 lg:py-24">
          <SectionHeading
            eyebrow="Our History"
            title="A methodology evolved over decades."
            description="The SPAN approach has been developed and refined through multiple emergency management programs. Each program is distinct—do not assume they are the same legal entity."
          />
          <div className="mt-12 relative pl-6 sm:pl-8 border-l-2 border-border space-y-8 max-w-3xl">
            {milestones.map((m) => (
              <div key={m.year + m.program} className="relative">
                <div className="absolute -left-[31px] sm:-left-[35px] top-1 h-4 w-4 rounded-full bg-accent-ink border-4 border-muted/50" />
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-mono text-sm font-bold text-secondary">
                    {m.year}{m.endYear ? `–${m.endYear}` : ""}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{m.context}</span>
                </div>
                <h3 className="mt-1.5 text-lg font-semibold text-primary">{m.program}</h3>
                <p className="text-sm text-muted-foreground">{m.location}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground italic max-w-3xl">
            Note: SNAP, SDART, MYN, and SPAN are related but distinct programs with different
            organizational homes. Awards and recognition (including any FEMA honors) will be
            listed once exact names, dates, and supporting documentation are provided.
          </p>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-16 lg:py-24">
          <SectionHeading
            eyebrow="Awards & Recognition"
            title="Documented achievements and formal recognition."
            description="SPAN and its predecessor programs have received recognition from emergency management organizations. Specific awards, including any FEMA honors, will be listed here once exact names, dates, and supporting documentation are confirmed."
          />
          <div className="mt-12 max-w-2xl">
            <div className="flex items-start gap-5 bg-background rounded-xl p-7 border border-dashed border-border">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <Award className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">FEMA Recognition & Formal Awards</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Award names, dates, and supporting documentation will be published here once verified.
                  We do not list unverified awards, endorsements, or participation statistics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-world evidence */}
      <section className="bg-background">
        <div className="container-span py-16 lg:py-24">
          <SectionHeading
            eyebrow="Real-World Experience"
            title="Tested during actual disasters."
            description="The SPAN methodology has been applied and validated during real-world events across decades."
          />
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {evidenceEvents.map((e) => (
              <div key={e.name} className="bg-card rounded-xl p-6 border border-border">
                <div className="font-mono text-sm font-bold text-secondary mb-2">{e.year}</div>
                <h3 className="text-lg font-semibold text-primary mb-1">{e.name}</h3>
                <p className="text-sm text-muted-foreground">{e.location}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{e.summary}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground italic max-w-3xl">
            Detailed accounts, photographs, and testimonials will be added as verified materials
            become available. We do not publish unverified participant counts or endorsements.
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="Learn the Method"
        title="See how SPAN helps neighborhoods prepare and respond."
        primaryLabel="Explore Neighborhood Preparedness"
        primaryTo="/neighborhood-preparedness"
        secondaryLabel="Contact SPAN"
        secondaryTo="/contact"
      />
    </>
  );
}
