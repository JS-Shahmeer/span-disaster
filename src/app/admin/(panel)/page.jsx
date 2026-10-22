import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function Dashboard() {
  const [unread, messages, products, resources] = await Promise.all([
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.contactMessage.count(),
    prisma.product.count(),
    prisma.resource.count(),
  ]);

  const cards = [
    { href: "/admin/messages", label: "Unread messages", value: unread, sub: `${messages} total` },
    { href: "/admin/products", label: "Products", value: products, sub: "In the storefront" },
    { href: "/admin/resources", label: "Resources", value: resources, sub: "In the resource library" },
  ];

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-5">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="bg-card border border-border rounded-xl p-6 hover:border-secondary/50 transition-colors">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p className="mt-1 font-heading text-4xl font-semibold text-primary">{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.sub}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
