import "server-only";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { formatMoney, sendEmail } from "@/lib/email";

// Records a paid Checkout Session as an Order. Idempotent: Stripe may deliver the
// same event more than once, and the success page may race the webhook.
export async function recordCheckoutSession(sessionId) {
  const existing = await prisma.order.findUnique({ where: { stripeSessionId: sessionId }, include: { items: true } });
  if (existing) return { order: existing, created: false };

  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items.data.price.product"] });
  if (session.payment_status !== "paid") return { order: null, created: false };

  const shipping = session.collected_information?.shipping_details ?? session.shipping_details ?? null;
  const customer = session.customer_details ?? {};
  const items = session.line_items.data.map((li) => {
    const product = li.price?.product;
    return {
      productId: product?.metadata?.productId ?? null,
      slug: product?.metadata?.slug ?? "",
      name: li.description ?? product?.name ?? "Item",
      unitAmount: li.price?.unit_amount ?? Math.round(li.amount_subtotal / li.quantity),
      quantity: li.quantity,
    };
  });

  try {
    const order = await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        stripePaymentIntentId: typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id,
        email: customer.email ?? "",
        name: shipping?.name ?? customer.name ?? null,
        phone: customer.phone ?? null,
        currency: session.currency ?? "usd",
        amountSubtotal: session.amount_subtotal ?? 0,
        amountShipping: session.total_details?.amount_shipping ?? 0,
        amountTax: session.total_details?.amount_tax ?? 0,
        amountTotal: session.amount_total ?? 0,
        shippingAddress: shipping?.address ?? undefined,
        items: { create: items },
      },
      include: { items: true },
    });
    await notifyOrder(order);
    return { order, created: true };
  } catch (error) {
    // Unique violation: another request recorded it first.
    if (error?.code === "P2002") {
      return { order: await prisma.order.findUnique({ where: { stripeSessionId: sessionId }, include: { items: true } }), created: false };
    }
    throw error;
  }
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
  const ref = order.id.slice(-8).toUpperCase();
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
