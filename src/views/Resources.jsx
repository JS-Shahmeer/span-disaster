"use client";

import { useState, useMemo } from "react";
import { Download, FileText, Image as ImageIcon, Video, BookOpen, Search, PlayCircle } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTASection from "@/components/shared/CTASection";
import VideoModal from "@/components/resources/VideoModal";
import { resources, resourceTypes } from "@/data/resources";

const typeIcons = {
  handout: FileText,
  pdf: FileText,
  graphic: ImageIcon,
  video: Video,
  workbook: BookOpen,
};

const categories = ["All", "Personal Preparedness", "Neighborhood Preparedness", "Video Resources", "About SPAN"];

export default function Resources() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [videoResource, setVideoResource] = useState(null);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchesCategory = category === "All" || r.category === category;
      const matchesSearch = !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <>
      <section className="bg-background border-b border-border">
        <div className="container-span py-14 lg:py-20">
          <SectionHeading
            eyebrow="Resource Library"
            title="Free handouts, guides, and educational materials."
            description="Downloadable resources to support your personal and neighborhood preparedness. All materials are free unless otherwise noted."
          />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-card border-b border-border">
        <div className="container-span py-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring min-h-[40px] ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:bg-muted border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus-ring"
            />
          </div>
        </div>
      </section>

      {/* Resource grid */}
      <section className="bg-background">
        <div className="container-span py-12 lg:py-16">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No resources found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((r) => {
                const Icon = typeIcons[r.type] || FileText;
                const typeInfo = resourceTypes[r.type];
                const isVideo = r.type === "video";
                return (
                  <div key={r.id} className="bg-card rounded-xl border border-border hover:border-secondary/40 hover:shadow-md transition-all flex flex-col overflow-hidden">
                    {/* Thumbnail */}
                    <div className="aspect-[16/10] bg-muted flex items-center justify-center relative">
                      <Icon className="h-10 w-10 text-muted-foreground/50" />
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="h-12 w-12 text-primary/40" />
                        </div>
                      )}
                      {r.free && (
                        <span className="absolute top-3 right-3 text-xs font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                          Free
                        </span>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                          {typeInfo?.label || r.type}
                        </span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{r.category}</span>
                      </div>
                      <h3 className="text-base font-semibold text-primary mb-1.5">{r.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{r.description}</p>
                      <div className="mt-auto">
                        {isVideo ? (
                          <button
                            onClick={() => setVideoResource(r)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all"
                          >
                            <Video className="h-4 w-4" />
                            Watch Video
                          </button>
                        ) : (
                          <button
                            className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all"
                            disabled
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="mt-8 text-sm text-muted-foreground italic">
            Download links and video embeds will be activated as official materials become available.
            Resources shown as placeholders are not finished educational materials.
          </p>
        </div>
      </section>

      <VideoModal
        open={!!videoResource}
        onClose={() => setVideoResource(null)}
        resource={videoResource}
      />

      <CTASection
        eyebrow="Keep Going"
        title="Put these resources into practice with your neighborhood."
        primaryLabel="Explore Neighborhood Preparedness"
        primaryTo="/neighborhood-preparedness"
        secondaryLabel="Visit the Storefront"
        secondaryTo="/shop"
      />
    </>
  );
}
