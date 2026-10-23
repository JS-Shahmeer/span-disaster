import Link from "next/link";
import { ArrowRight, Droplets, Utensils, HeartPulse, Lightbulb, Phone, Home, Sparkles, FileText, ShieldAlert, Flame, MapPin, Users } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTASection from "@/components/shared/CTASection";
import { activities } from "@/data/activities";

const iconMap = {
  Droplets, Utensils, HeartPulse, Lightbulb, Phone, Home, Sparkles, FileText, ShieldAlert, Flame, MapPin, Users,
};

function ActivityCard({ activity }) {
  const Icon = iconMap[activity.icon] || Droplets;
  return (
    <Link
      href={`/personal-preparedness/${activity.slug}`}
      className="group bg-card rounded-xl p-6 border border-border hover:border-secondary/40 hover:shadow-md transition-all focus-ring"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
          <Icon className="h-6 w-6" />
        </div>
        <span className="font-mono text-sm font-semibold text-border">
          {String(activity.id).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-primary mb-2">{activity.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{activity.summary}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary group-hover:gap-3 transition-all">
        Start activity
        <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export default function PersonalPreparedness() {
  const first = activities[0];
  const last = activities[activities.length - 1];
  const middle = activities.slice(1, -1);
  const FirstIcon = iconMap[first.icon] || Droplets;
  const LastIcon = iconMap[last.icon] || Droplets;

  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-14 lg:py-20">
          <SectionHeading
            eyebrow="Personal Preparedness"
            title="12 practical activities for your household."
            description="Preparedness is about knowing what to do. Work through these twelve activities one at a time to build real readiness—each one addresses a specific threat and gives you a practical response."
          />
        </div>
      </section>

      {/* Featured first activity */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-12 lg:py-16">
          <Link href={`/personal-preparedness/${first.slug}`} className="group block focus-ring rounded-2xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="aspect-[16/10] lg:aspect-[4/3] rounded-2xl bg-secondary/10 flex items-center justify-center">
                <FirstIcon className="h-20 w-20 text-secondary/40" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-semibold text-secondary">Activity 01</span>
                  <span className="h-px w-8 bg-accent-ink" />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Start Here</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-3">{first.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">{first.summary}</p>
                <span className="inline-flex items-center gap-2 text-base font-semibold text-secondary group-hover:gap-3 transition-all">
                  Begin the first activity
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Middle activities grid */}
      <section className="bg-background">
        <div className="container-span py-12 lg:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {middle.map((a) => (
              <ActivityCard key={a.id} activity={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured last activity — bridges to neighborhood */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-span py-12 lg:py-16">
          <Link href={`/personal-preparedness/${last.slug}`} className="group block focus-ring rounded-2xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-sm font-semibold text-accent">Activity 12</span>
                  <span className="h-px w-8 bg-secondary" />
                  <span className="text-xs font-mono uppercase tracking-wider text-primary-foreground/60">Next Step</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3">{last.title}</h2>
                <p className="text-primary-foreground/70 leading-relaxed mb-5">{last.summary}</p>
                <span className="inline-flex items-center gap-2 text-base font-semibold text-accent group-hover:gap-3 transition-all">
                  Complete the journey
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
              <div className="order-1 lg:order-2 aspect-[16/10] lg:aspect-[4/3] rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <LastIcon className="h-20 w-20 text-accent/60" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      <CTASection
        eyebrow="Ready for the Next Step?"
        title="Once your household is prepared, organize with your neighbors."
        primaryLabel="Explore Neighborhood Preparedness"
        primaryTo="/neighborhood-preparedness"
        secondaryLabel="Browse Free Resources"
        secondaryTo="/resources"
      />
    </>
  );
}
