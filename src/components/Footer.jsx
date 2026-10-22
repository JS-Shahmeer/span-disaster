import Link from "next/link";
import { Plus, Mail, Facebook, Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/config/site";

const socialIcons = {
  facebook: { icon: Facebook, label: "Facebook" },
  instagram: { icon: Instagram, label: "Instagram" },
  youtube: { icon: Youtube, label: "YouTube" },
  linkedin: { icon: Linkedin, label: "LinkedIn" },
  x: { icon: Twitter, label: "X" },
};

const socialLinks = Object.entries(siteConfig.social)
  .filter(([key, url]) => url && socialIcons[key])
  .map(([key, url]) => ({ url, ...socialIcons[key] }));

const footerSections = [
  {
    title: "Learn",
    links: [
      { label: "Personal Preparedness", path: "/personal-preparedness" },
      { label: "Neighborhood Preparedness", path: "/neighborhood-preparedness" },
      { label: "9-Step Response Plan", path: "/neighborhood-preparedness/first-meeting" },
      { label: "Free Resources", path: "/resources" },
    ],
  },
  {
    title: "Organization",
    links: [
      { label: "About SPAN", path: "/about" },
      { label: "Storefront", path: "/shop" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Use", path: "/terms" },
      { label: "Accessibility Statement", path: "/accessibility" },
      { label: "Shipping & Returns", path: "/shipping" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-span py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Plus className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <div className="font-heading text-xl font-semibold">SPAN</div>
                <div className="text-[0.65rem] font-mono uppercase tracking-[0.15em] text-primary-foreground/60">
                  Disaster Services
                </div>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              A 501(c)(3) nonprofit helping neighborhoods prepare, organize, and practice the skills
              needed to respond together during the critical first hour after a disaster.
            </p>
            {socialLinks.length > 0 && (
              <ul className="mt-5 flex items-center gap-3" aria-label="SPAN on social media">
                {socialLinks.map(({ url, icon: Icon, label }) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors focus-ring"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="text-sm font-semibold font-mono uppercase tracking-wider text-accent mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.path}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors focus-ring rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50 font-mono">
            © {new Date().getFullYear()} SPAN Disaster Services. 501(c)(3) nonprofit corporation.
          </p>
          <p className="text-xs text-primary-foreground/50">
            Your Neighbors. Your Preparedness. Your First Response.
          </p>
        </div>
      </div>
    </footer>
  );
}
