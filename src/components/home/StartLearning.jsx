import Link from "next/link";
import { ArrowRight, User, Users } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

export default function StartLearning() {
  return (
    <section className="bg-background">
      <div className="container-span py-16 lg:py-24">
        <SectionHeading
          eyebrow="Start Learning"
          title="Two pathways into preparedness."
          description="Whether you are starting on your own or organizing your neighbors, SPAN gives you a clear place to begin."
          align="center"
        />
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Link
            href="/personal-preparedness"
            className="group bg-card rounded-2xl p-8 border border-border hover:border-secondary/40 hover:shadow-lg transition-all focus-ring"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-5">
              <User className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Personal Preparedness</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Twelve practical activities that help you and your household build readiness one
              skill at a time—from water and first aid to evacuation and neighborhood connection.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
              Start the 12 activities
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <Link
            href="/neighborhood-preparedness"
            className="group bg-primary text-primary-foreground rounded-2xl p-8 hover:shadow-lg transition-all focus-ring"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/15 text-secondary mb-5">
              <Users className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Neighborhood Preparedness</h3>
            <p className="text-primary-foreground/70 leading-relaxed mb-4">
              A structured process for organizing 15–20 households into a response team. Five
              meetings move your neighborhood from learning to a full functional drill.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
              Explore the five meetings
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
