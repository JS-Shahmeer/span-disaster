import Link from "next/link";
import { prisma } from "@/lib/db";

function formatPrice(cents) {
  if (cents == null) return "Not set";
  if (cents === 0) return "Free";
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function ProductsPage() {
  const products = await prisma.product.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] });

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link href="/admin/products/new" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:brightness-110">
          New product
        </Link>
      </div>
      <div className="overflow-x-auto bg-card border border-border rounded-xl">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground border-b border-border">
            <tr>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Category</th>
              <th className="p-3 font-medium">Price</th>
              <th className="p-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="p-3">
                  <Link href={`/admin/products/${p.id}`} className="font-medium text-primary hover:underline">{p.name}</Link>
                  <div className="text-xs text-muted-foreground">/shop/{p.slug}</div>
                </td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">{formatPrice(p.priceCents)}</td>
                <td className="p-3">{p.published ? "Published" : "Hidden"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
