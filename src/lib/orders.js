import "server-only";
import { stripe } from "@/lib/stripe";
import { formatMoney, sendEmail } from "@/lib/email";

// Orders live in Stripe (Dashboard > Payments); there is no database. This turns a
// paid Checkout Session into a plain order object for emails and the success page.
export async function getPaidOrder(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
  if (session.payment_status !== "paid") return null;

  const shipping = session.collected_information?.shipping_details ?? session.shipping_details ?? null;
  const customer = session.customer_details ?? {};
  return {
    ref: session.id.slice(-8).toUpperCase(),
    email: customer.email ?? "",
    name: shipping?.name ?? customer.name ?? null,
    phone: customer.phone ?? null,
    currency: session.currency ?? "usd",
    amountSubtotal: session.amount_subtotal ?? 0,
    amountShipping: session.total_details?.amount_shipping ?? 0,
    amountTax: session.total_details?.amount_tax ?? 0,
    amountTotal: session.amount_total ?? 0,
    shippingAddress: shipping?.address ?? null,
    items: session.line_items.data.map((li) => ({
      name: li.description ?? "Item",
      unitAmount: li.price?.unit_amount ?? Math.round(li.amount_subtotal / li.quantity),
      quantity: li.quantity,
    })),
  };
}

// Called from the webhook only, so each paid order is emailed once (Stripe retries
// only when the webhook fails).
export async function handlePaidSession(sessionId) {
  const order = await getPaidOrder(sessionId);
  if (order) await notifyOrder(order);
}

function orderSummary(order) {
  const lines = order.items.map((i) => `  ${i.quantity} x ${i.name}  ${formatMoney(i.unitAmount * i.quantity, order.currency)}`);
  const a = order.shippingAddress;
  const address = a ? [a.line1, a.line2, `${a.city ?? ""}, ${a.state ?? ""} ${a.postal_code ?? ""}`, a.country].filter(Boolean).join("\n  ") : "None";
  return [
    ...lines,
    "",
    `Subtotal: ${formatMoney(order.amountSubtotal, order.currency)}`,
    `Shipping: ${formatMoney(order.amountShipping, order.currency)}`,
    `Tax: ${formatMoney(order.amountTax, order.currency)}`,
    `Total: ${formatMoney(order.amountTotal, order.currency)}`,
    "",
    `Ship to: ${order.name ?? ""}\n  ${address}`,
  ].join("\n");
}

async function notifyOrder(order) {
  const { ref } = order;
  await Promise.all([
    sendEmail({
      to: process.env.NOTIFY_EMAIL,
      replyTo: order.email,
      subject: `New order ${ref} from ${order.name ?? order.email}`,
      text: `A new order was paid.\n\nCustomer: ${order.name ?? ""} <${order.email}>\nPhone: ${order.phone ?? ""}\n\n${orderSummary(order)}`,
    }),
    sendEmail({
      to: order.email,
      subject: `Your SPAN Disaster Services order ${ref}`,
      text: `Thank you for your order. We'll let you know when it ships.\n\n${orderSummary(order)}\n\nQuestions? Just reply to this email.`,
      replyTo: process.env.NOTIFY_EMAIL,
    }),
  ]);
}
