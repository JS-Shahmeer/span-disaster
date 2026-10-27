import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { handlePaidSession } from "@/lib/orders";

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), request.headers.get("stripe-signature"), secret);
  } catch (error) {
    return NextResponse.json({ error: `Invalid signature: ${error.message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await handlePaidSession(event.data.object.id);
        break;
    }
  } catch (error) {
    console.error(`Webhook ${event.type} failed`, error);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
