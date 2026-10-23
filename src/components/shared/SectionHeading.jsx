export default function SectionHeading({ eyebrow, title, description, align = "left", light = false }) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`eyebrow mb-3 ${align === "center" ? "flex items-center justify-center gap-3" : ""}`}>
          {align === "center" && <span className="h-px w-8 bg-accent-ink" />}
          {eyebrow}
          {align === "center" && <span className="h-px w-8 bg-accent-ink" />}
        </div>
      )}
      <h2 className={`text-3xl sm:text-4xl font-semibold leading-tight ${light ? "text-primary-foreground" : "text-primary"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
