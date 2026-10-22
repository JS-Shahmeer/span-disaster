import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const heroImage = "https://media.base44.com/images/public/6acfc11b88787a633a2cb9f6/b5a18e0e3_generated_571d5270.png";

export default function Hero() {
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="container-span py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div className="animate-fade-up">
            <div className="eyebrow mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-accent-ink" />
              Your Neighbors. Your Preparedness. Your First Response.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] text-primary text-balance">
              Your Neighbors May Be Your First Responders.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              When disaster strikes and emergency services are overwhelmed, the first hour matters.
              SPAN helps neighborhoods prepare, organize, and practice the skills needed to respond
              together.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/neighborhood-preparedness"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]"
              >
                Explore Neighborhood Preparedness
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/personal-preparedness"
                className="inline-flex items-center justify-center border border-border bg-card text-primary px-6 py-3 rounded-md text-base font-semibold hover:bg-muted transition-all focus-ring min-h-[48px]"
              >
                Start with Personal Preparedness
              </Link>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={heroImage}
                alt="Neighbors gathered around a table, reviewing a map and planning together during golden hour"
                className="w-full h-[420px] lg:h-[500px]"
                fittingType="fill"
              />
            </div>
            {/* Floating 9-Step preview widget */}
            <div className="absolute -bottom-5 -left-5 hidden sm:block bg-card rounded-xl shadow-lg border border-border p-4 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-sm font-bold">9</div>
                <span className="text-sm font-semibold text-primary">Step Response Plan</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A structured process for the first hour after a disaster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
