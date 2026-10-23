import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/email";
import { updateOrder } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/fields";

export default async function OrderPage({ params }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) notFound();
  const a = order.shippingAddress;
  const money = (c) => formatMoney(c, order.currency);

  return (
    <>
      <Link href="/admin/orders" className="text-sm text-muted-foreground hover:text-primary">&larr; All orders</Link>
      <h1 className="text-3xl font-semibold mt-2 mb-1">Order {order.id.slice(-8).toUpperCase()}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        {order.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })} · Stripe {order.stripePaymentIntentId ?? order.stripeSessionId}
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Items</h2>
          <ul className="divide-y divide-border text-sm">
            {order.items.map((i) => (
              <li key={i.id} className="flex justify-between py-2">
                <span>{i.quantity} × {i.name}</span>
                <span>{money(i.unitAmount * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{money(order.amountSubtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{money(order.amountShipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>{money(order.amountTax)}</dd></div>
            <div className="flex justify-between font-semibold text-primary"><dt>Total</dt><dd>{money(order.amountTotal)}</dd></div>
          </dl>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 text-sm">
            <h2 className="text-lg font-semibold mb-3">Customer</h2>
            <p>{order.name}</p>
            <p><a href={`mailto:${order.email}`} className="text-secondary hover:underline">{order.email}</a></p>
            {order.phone && <p>{order.phone}</p>}
            {a && (
              <address className="not-italic mt-3 text-muted-foreground">
                {a.line1}<br />
                {a.line2 && <>{a.line2}<br /></>}
                {a.city}, {a.state} {a.postal_code}<br />
                {a.country}
              </address>
            )}
          </div>

          <form action={updateOrder.bind(null, order.id)} className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-semibold">Fulfillment</h2>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-primary mb-1">Status</label>
              <select id="status" name="status" defaultValue={order.status} className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus-ring">
                <option value="paid">Paid (to fulfill)</option>
                <option value="fulfilled">Fulfilled / shipped</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-primary mb-1">Notes</label>
              <textarea id="notes" name="notes" rows={3} defaultValue={order.notes ?? ""} placeholder="Tracking number, etc." className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus-ring" />
            </div>
            <SubmitButton>Save</SubmitButton>
            <p className="text-xs text-muted-foreground">Refunds are issued from the Stripe dashboard and update the status automatically.</p>
          </form>
        </div>
      </div>
    </>
  );
}
