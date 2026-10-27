import Link from "next/link";
import { Download, ArrowRight, FileText, Video, Image as ImageIcon } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

const typeIcons = {
  handout: FileText,
  pdf: FileText,
  graphic: ImageIcon,
  video: Video,
};

export default function ResourcesPreview({ resources }) {
  const featured = resources.filter((r) => r.type !== "video").slice(0, 3);

  return (
    <section className="bg-card border-y border-border">
      <div className="container-span py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeading
            eyebrow="Free Resources"
            title="Downloadable handouts and guides."
            description="Practical, printable materials to support your preparedness journey."
          />
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:gap-3 transition-all shrink-0"
          >
            Browse all resources
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {featured.map((r) => {
            const Icon = typeIcons[r.type] || FileText;
            return (
              <div key={r.id} className="bg-background rounded-xl p-6 border border-border hover:border-secondary/40 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{r.category}</span>
                </div>
                <h3 className="text-base font-semibold text-primary mb-1.5">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.description}</p>
                {r.fileUrl ? (
                  <a
                    href={r.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </a>
                ) : (
                  <button className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all" disabled>
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-xs text-muted-foreground italic">
          Download links will be activated as official materials become available.
        </p>
      </div>
    </section>
  );
}
