"use client";

import { useEffect } from "react";
import { X, PlayCircle } from "lucide-react";

export default function VideoModal({ open, onClose, resource }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || !resource) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={resource.title}
    >
      <div
        className="bg-card rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="text-lg font-semibold text-primary">{resource.title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors focus-ring"
            aria-label="Close video"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
        <div className="p-6">
          {resource.videoUrl ? (
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={resource.videoUrl}
                title={resource.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video rounded-xl bg-muted/40 border-2 border-dashed border-border flex flex-col items-center justify-center gap-3">
              <PlayCircle className="h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground text-center max-w-xs px-4">
                This video is still being developed. The embedded video will appear here when it is available.
              </p>
            </div>
          )}
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
          {resource.transcript && (
            <details className="mt-4 group">
              <summary className="text-sm font-medium text-secondary cursor-pointer list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▸</span>
                View transcript
              </summary>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed whitespace-pre-line pl-6">
                {resource.transcript}
              </p>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
