"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";
import CartLink from "@/components/cart/CartLink";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About SPAN", path: "/about" },
  { label: "Personal Preparedness", path: "/personal-preparedness" },
  { label: "Neighborhood Preparedness", path: "/neighborhood-preparedness" },
  { label: "Resources", path: "/resources" },
  { label: "Shop", path: "/shop" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (path) => (path === "/" ? pathname === "/" : pathname === path || pathname.startsWith(`${path}/`));

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Status bar */}
      <div className="bg-primary text-primary-foreground/80 text-xs">
        <div className="container-span flex items-center justify-center gap-2 py-1.5 px-4">
          <span className="font-mono uppercase tracking-wider">501(c)(3) Nonprofit · Est. 2004</span>
          <span className="opacity-40">|</span>
          <span className="hidden sm:inline font-mono uppercase tracking-wider">Program origins: 1986</span>
        </div>
      </div>

      {/* Main nav */}
      <div className={`bg-card border-b border-border transition-shadow ${scrolled ? "shadow-md" : ""}`}>
        <div className="container-span flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="SPAN Disaster Services home">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div className="leading-none">
              <div className="font-heading text-xl font-semibold text-primary">SPAN</div>
              <div className="text-[0.65rem] font-mono uppercase tracking-[0.15em] text-muted-foreground">Disaster Services</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={
                  `px-3 py-2 text-sm font-medium rounded-md transition-colors focus-ring ${
                    isActive(item.path)
                      ? "text-primary bg-muted"
                      : "text-foreground/70 hover:text-primary hover:bg-muted/60"
                  }`
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <CartLink />
            <Link
              href="/personal-preparedness"
              className="hidden sm:inline-flex items-center justify-center bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:brightness-110 transition-all focus-ring"
            >
              Start Preparing
            </Link>
            <button
              className="lg:hidden p-2 rounded-md hover:bg-muted focus-ring"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-border bg-card" aria-label="Mobile">
            <div className="container-span py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={
                    `px-3 py-3 text-base font-medium rounded-md transition-colors focus-ring ${
                      isActive(item.path) ? "text-primary bg-muted" : "text-foreground/80 hover:bg-muted/60"
                    }`
                  }
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/personal-preparedness"
                className="mt-2 inline-flex items-center justify-center bg-secondary text-secondary-foreground px-4 py-3 rounded-md text-base font-semibold focus-ring"
              >
                Start Preparing
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
