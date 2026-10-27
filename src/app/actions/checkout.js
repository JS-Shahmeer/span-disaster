"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { products } from "@/data/products";
import { stripe, shippingCountries } from "@/lib/stripe";

const cartSchema = z
  .array(z.object({ slug: z.string().min(1).max(200), quantity: z.number().int().min(1).max(20) }))
  .min(1)
  .max(50);

async function siteOrigin() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
}

export async function createCheckoutSession(cart) {
  if (!stripe) return { error: "Checkout isn't available yet. Please contact us to order." };

  const parsed = cartSchema.safeParse(cart);
  if (!parsed.success) return { error: "Your cart looks invalid. Please refresh and try again." };

  // Prices always come from src/data, never from the browser.
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const lines = parsed.data.filter((i) => bySlug.get(i.slug)?.price > 0);
  if (lines.length !== parsed.data.length) {
    return { error: "Some items are no longer available. Please review your cart.", unavailable: parsed.data.filter((i) => !lines.includes(i)).map((i) => i.slug) };
  }

  const origin = await siteOrigin();
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lines.map((i) => {
        const p = bySlug.get(i.slug);
        return {
          quantity: i.quantity,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(p.price * 100),
            product_data: { name: p.name, metadata: { slug: p.slug } },
          },
        };
      }),
      shipping_address_collection: { allowed_countries: shippingCountries },
      ...(process.env.STRIPE_SHIPPING_RATE_ID && { shipping_options: [{ shipping_rate: process.env.STRIPE_SHIPPING_RATE_ID }] }),
      ...(process.env.STRIPE_AUTOMATIC_TAX === "true" && { automatic_tax: { enabled: true } }),
      phone_number_collection: { enabled: true },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    });
    return { url: session.url };
  } catch (error) {
    console.error("createCheckoutSession failed", error);
    return { error: "We couldn't start checkout. Please try again in a moment." };
  }
}
