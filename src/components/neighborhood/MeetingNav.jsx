import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentMeetings } from "@/data/meetings";

export default function MeetingNav({ currentSlug }) {
  const { prev, next } = getAdjacentMeetings(currentSlug);

  return (
    <section className="bg-muted/40 border-t border-border">
      <div className="container-span py-10">
        <div className="grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link href={`/neighborhood-preparedness/${prev.slug}`} className="group flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-secondary/40 transition-all focus-ring">
              <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors shrink-0" />
              <div>
                <div className="text-xs font-mono text-muted-foreground">Previous · Meeting {prev.number}</div>
                <div className="font-semibold text-primary">{prev.title}</div>
              </div>
            </Link>
          ) : (
            <Link href="/neighborhood-preparedness" className="group flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-secondary/40 transition-all focus-ring">
              <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors shrink-0" />
              <div>
                <div className="text-xs font-mono text-muted-foreground">Back to Overview</div>
                <div className="font-semibold text-primary">Neighborhood Preparedness</div>
              </div>
            </Link>
          )}
          {next ? (
            <Link href={`/neighborhood-preparedness/${next.slug}`} className="group flex items-center justify-end gap-4 bg-card rounded-xl p-5 border border-border hover:border-secondary/40 transition-all focus-ring text-right">
              <div>
                <div className="text-xs font-mono text-muted-foreground">Next · Meeting {next.number}</div>
                <div className="font-semibold text-primary">{next.title}</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors shrink-0" />
            </Link>
          ) : (
            <Link href="/resources" className="group flex items-center justify-end gap-4 bg-primary text-primary-foreground rounded-xl p-5 transition-all focus-ring text-right">
              <div>
                <div className="text-xs font-mono text-primary-foreground/60">Continue</div>
                <div className="font-semibold">Explore Resources</div>
              </div>
              <ArrowRight className="h-5 w-5 text-accent shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
