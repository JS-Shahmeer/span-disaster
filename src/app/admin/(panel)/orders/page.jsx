import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/email";

const statusStyles = {
  paid: "bg-accent/20 text-accent-ink",
  fulfilled: "bg-secondary/10 text-secondary",
  cancelled: "bg-muted text-muted-foreground",
  refunded: "bg-destructive/10 text-destructive",
};

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { items: { select: { quantity: true } } },
  });

  return (
    <>
      <h1 className="text-3xl font-semibold mb-8">Orders</h1>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto bg-card border border-border rounded-xl">
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground border-b border-border">
              <tr>
                <th className="p-3 font-medium">Order</th>
                <th className="p-3 font-medium">Customer</th>
                <th className="p-3 font-medium">Items</th>
                <th className="p-3 font-medium">Total</th>
                <th className="p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-mono font-medium text-primary hover:underline">
                      {o.id.slice(-8).toUpperCase()}
                    </Link>
                    <div className="text-xs text-muted-foreground">{o.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" })}</div>
                  </td>
                  <td className="p-3">
                    {o.name}
                    <div className="text-xs text-muted-foreground">{o.email}</div>
                  </td>
                  <td className="p-3">{o.items.reduce((n, i) => n + i.quantity, 0)}</td>
                  <td className="p-3">{formatMoney(o.amountTotal, o.currency)}</td>
                  <td className="p-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[o.status] ?? ""}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
