import { Clock } from "lucide-react";

export default function FirstHour() {
  return (
    <section className="bg-muted/50 border-y border-border">
      <div className="container-span py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">The First Hour Matters</div>
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight text-primary">
              When 911 is overwhelmed, neighbors become the first response.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <p className="text-lg text-muted-foreground leading-relaxed">
              In a major disaster, emergency services can be overwhelmed or unable to reach every
              neighborhood right away. The first hour following the event—the{" "}
              <strong className="text-primary font-semibold">Golden Hour</strong>—is when
              neighbors may need to take practical, appropriate actions while waiting for
              professional assistance.
            </p>
            <div className="flex items-start gap-4 bg-card rounded-xl p-5 border border-border">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">SPAN's definition of "disaster"</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Within the SPAN program, a <em>disaster</em> is a situation in which 911
                  responders are unavailable during the first hour. If 911 is available, the program
                  considers it an <em>emergency</em> rather than a disaster. Always contact
                  emergency services when they are available and appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
