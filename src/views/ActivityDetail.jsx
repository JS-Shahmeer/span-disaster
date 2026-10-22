"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Download, Droplets, Utensils, HeartPulse, Lightbulb, Phone, Home, Sparkles, FileText, ShieldAlert, Flame, MapPin, Users, AlertTriangle, Target, Wrench, ThumbsUp, ClipboardCheck, Compass } from "lucide-react";
import { getActivityBySlug, getAdjacentActivities, activities } from "@/data/activities";

const iconMap = {
  Droplets, Utensils, HeartPulse, Lightbulb, Phone, Home, Sparkles, FileText, ShieldAlert, Flame, MapPin, Users,
};

const framework = [
  { key: "threat", label: "The Threat", icon: AlertTriangle, color: "text-destructive" },
  { key: "whyItMatters", label: "Why It Matters", icon: Target, color: "text-secondary" },
  { key: "response", label: "Your Response", icon: Wrench, color: "text-secondary" },
  { key: "whyYouCan", label: "Why You Can Do This", icon: ThumbsUp, color: "text-secondary" },
  { key: "practice", label: "Practice It", icon: ClipboardCheck, color: "text-secondary" },
  { key: "takeNextStep", label: "Take the Next Step", icon: Compass, color: "text-primary" },
];

export default function ActivityDetail({ slug }) {
  const activity = getActivityBySlug(slug);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(false);
    try {
      const stored = JSON.parse(sessionStorage.getItem("span-completed") || "[]");
      if (activity && stored.includes(activity.id)) setCompleted(true);
    } catch { /* noop */ }
  }, [slug, activity]);

  if (!activity) return null;

  const { prev, next } = getAdjacentActivities(activity.id);
  const Icon = iconMap[activity.icon] || Droplets;

  const toggleCompleted = () => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("span-completed") || "[]");
      const updated = stored.includes(activity.id)
        ? stored.filter((id) => id !== activity.id)
        : [...stored, activity.id];
      sessionStorage.setItem("span-completed", JSON.stringify(updated));
      setCompleted(updated.includes(activity.id));
    } catch { /* noop */ }
  };

  const completedCount = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("span-completed") || "[]").length;
    } catch {
      return 0;
    }
  })();

  return (
    <>
      {/* Header */}
      <section className="bg-background border-b border-border">
        <div className="container-span py-10 lg:py-14">
          {/* Breadcrumb + progress */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <Link href="/personal-preparedness" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              All Activities
            </Link>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-muted-foreground">
                Activity {activity.id} of {activities.length}
              </span>
              <div className="hidden sm:flex h-2 w-32 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-secondary transition-all" style={{ width: `${(completedCount / activities.length) * 100}%` }} />
              </div>
              <span className="font-mono text-xs text-muted-foreground">{completedCount}/{activities.length} done</span>
            </div>
          </div>

          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <div className="eyebrow mb-2">Activity {String(activity.id).padStart(2, "0")}</div>
              <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-primary">{activity.title}</h1>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed max-w-2xl">{activity.summary}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual placeholder */}
      <section className="bg-muted/30 border-b border-border">
        <div className="container-span py-6">
          <div className="aspect-[21/9] max-h-56 bg-card border border-border rounded-xl flex items-center justify-center">
            <Icon className="h-16 w-16 text-secondary/30" />
          </div>
          <p className="text-center text-xs text-muted-foreground italic mt-3">
            An official SPAN instructional graphic for this activity will be added when available.
          </p>
        </div>
      </section>

      {/* Framework sections */}
      <section className="bg-background">
        <div className="container-narrow py-12 lg:py-16 space-y-8">
          {framework.map((f, i) => {
            const isPractice = f.key === "practice";
            return (
              <div
                key={f.key}
                className={`rounded-2xl p-7 lg:p-8 ${isPractice ? "bg-secondary text-secondary-foreground" : i % 2 === 0 ? "bg-card border border-border" : "bg-muted/40 border border-border"}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${isPractice ? "bg-secondary-foreground/15" : "bg-background"}`}>
                    <f.icon className={`h-5 w-5 ${isPractice ? "text-secondary-foreground" : f.color}`} />
                  </div>
                  <h2 className={`text-xl font-semibold ${isPractice ? "text-secondary-foreground" : "text-primary"}`}>
                    {String.fromCharCode(65 + i)}. {f.label}
                  </h2>
                </div>
                <p className={`leading-relaxed ${isPractice ? "text-secondary-foreground/90" : "text-muted-foreground"}`}>
                  {activity[f.key]}
                </p>
              </div>
            );
          })}

          {/* Resources */}
          {activity.resources && activity.resources.length > 0 && (
            <div className="bg-card rounded-2xl p-7 border border-border">
              <h2 className="text-lg font-semibold text-primary mb-4">Related Resources</h2>
              <div className="flex flex-wrap gap-3">
                {activity.resources.map((r) => (
                  <Link
                    key={r}
                    href="/resources"
                    className="inline-flex items-center gap-2 bg-muted text-muted-foreground hover:text-secondary hover:bg-secondary/5 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    {r}
                  </Link>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground italic">
                Download links will be activated as official materials become available.
              </p>
              <Link
                href="/resources"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all"
              >
                View all resources
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Related products */}
          <div className="bg-card rounded-2xl p-7 border border-border">
            <h2 className="text-lg font-semibold text-primary mb-2">Related Products</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Preparedness items from the SPAN storefront that support this activity.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:gap-3 transition-all"
            >
              Visit the storefront
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mark complete */}
          <button
            onClick={toggleCompleted}
            className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold transition-all focus-ring min-h-[48px] ${
              completed
                ? "bg-secondary text-secondary-foreground"
                : "bg-card border-2 border-secondary text-secondary hover:bg-secondary/5"
            }`}
          >
            <Check className="h-5 w-5" />
            {completed ? "Completed (this session)" : "Mark as completed"}
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Progress is saved in your current browser session only.
          </p>
        </div>
      </section>

      {/* Prev / Next nav */}
      <section className="bg-muted/40 border-t border-border">
        <div className="container-span py-10">
          <div className="grid sm:grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/personal-preparedness/${prev.slug}`} className="group flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-secondary/40 transition-all focus-ring">
                <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
                <div>
                  <div className="text-xs font-mono text-muted-foreground">Previous · Activity {prev.id}</div>
                  <div className="font-semibold text-primary">{prev.title}</div>
                </div>
              </Link>
            ) : <div className="hidden sm:block" />}
            {next ? (
              <Link href={`/personal-preparedness/${next.slug}`} className="group flex items-center justify-end gap-4 bg-card rounded-xl p-5 border border-border hover:border-secondary/40 transition-all focus-ring text-right">
                <div>
                  <div className="text-xs font-mono text-muted-foreground">Next · Activity {next.id}</div>
                  <div className="font-semibold text-primary">{next.title}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary transition-colors" />
              </Link>
            ) : (
              <Link href="/neighborhood-preparedness" className="group flex items-center justify-end gap-4 bg-primary text-primary-foreground rounded-xl p-5 transition-all focus-ring text-right">
                <div>
                  <div className="text-xs font-mono text-primary-foreground/60">Next Step</div>
                  <div className="font-semibold">Explore Neighborhood Preparedness</div>
                </div>
                <ArrowRight className="h-5 w-5 text-secondary" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
