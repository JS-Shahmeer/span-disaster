import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { recordCheckoutSession } from "@/lib/orders";
import { formatMoney } from "@/lib/email";
import ClearCart from "@/components/cart/ClearCart";

export const metadata = { title: "Order Confirmed", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const { session_id: sessionId } = await searchParams;
  let order = null;
  if (stripe && prisma && typeof sessionId === "string" && sessionId.startsWith("cs_")) {
    // The webhook normally records the order first; this covers a slow webhook.
    order = (await recordCheckoutSession(sessionId).catch(() => null))?.order ?? null;
  }

  return (
    <section className="bg-background">
      <ClearCart />
      <div className="container-narrow py-20 lg:py-28 text-center">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-secondary/10 text-secondary mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-semibold text-primary mb-3">Thank you for your order.</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
          {order
            ? `We've received your payment of ${formatMoney(order.amountTotal, order.currency)}. A confirmation will be sent to ${order.email}.`
            : "Your payment is being processed. You'll receive a confirmation email shortly."}
        </p>
        {order && (
          <p className="mt-2 text-sm font-mono text-muted-foreground">Order reference {order.id.slice(-8).toUpperCase()}</p>
        )}
        <Link href="/personal-preparedness" className="mt-8 inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 rounded-md text-base font-semibold hover:bg-primary/90 transition-all focus-ring min-h-[48px]">
          Keep preparing
        </Link>
      </div>
    </section>
  );
}
