import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logoutAction } from "@/app/admin/actions";

export const metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/resources", label: "Resources" },
];

export default async function AdminLayout({ children }) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="container-span flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-heading text-lg font-semibold">SPAN Admin</Link>
            <nav className="flex flex-wrap gap-1" aria-label="Admin">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="px-3 py-1.5 rounded-md text-sm text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-primary-foreground/70 hover:text-primary-foreground">View site</Link>
            <span className="text-primary-foreground/60 hidden sm:inline">{admin.email}</span>
            <form action={logoutAction}>
              <button type="submit" className="underline-offset-2 hover:underline">Sign out</button>
            </form>
          </div>
        </div>
      </header>
      <main className="container-span py-10">
        {prisma ? children : <p className="text-destructive">DATABASE_URL is not configured.</p>}
      </main>
    </div>
  );
}
