"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Lock, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { createCheckoutSession } from "@/app/actions/checkout";

const money = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export default function Cart() {
  const { items, subtotal, loaded, setQuantity } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const checkout = async () => {
    setPending(true);
    setError("");
    const result = await createCheckoutSession(items.map(({ slug, quantity }) => ({ slug, quantity }))).catch(() => ({
      error: "We couldn't start checkout. Please try again.",
    }));
    if (result.url) {
      window.location.assign(result.url);
      return;
    }
    result.unavailable?.forEach((slug) => setQuantity(slug, 0));
    setError(result.error);
    setPending(false);
  };

  return (
    <section className="bg-background">
      <div className="container-narrow py-14 lg:py-20">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8">Your cart</h1>

        {loaded && items.length === 0 && (
          <div className="bg-card border border-border rounded-2xl p-10 text-center">
            <ShoppingCart className="h-10 w-10 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground mb-6">Your cart is empty.</p>
            <Link href="/shop" className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px]">
              Visit the Storefront
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <div className="bg-card border border-border rounded-2xl divide-y divide-border">
            {items.map((item) => (
              <div key={item.slug} className="flex flex-wrap items-center gap-4 p-5">
                <div className="flex-1 min-w-[10rem]">
                  <Link href={`/shop/${item.slug}`} className="font-semibold text-primary hover:underline">{item.name}</Link>
                  <p className="text-sm text-muted-foreground">{money(item.price)} each</p>
                </div>
                <div className="flex items-center gap-2" role="group" aria-label={`Quantity of ${item.name}`}>
                  <button type="button" onClick={() => setQuantity(item.slug, item.quantity - 1)} className="p-2 rounded-md border border-border hover:bg-muted focus-ring" aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium" aria-live="polite">{item.quantity}</span>
                  <button type="button" onClick={() => setQuantity(item.slug, item.quantity + 1)} className="p-2 rounded-md border border-border hover:bg-muted focus-ring" aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="w-24 text-right font-semibold text-primary">{money(item.price * item.quantity)}</div>
                <button type="button" onClick={() => setQuantity(item.slug, 0)} className="p-2 rounded-md text-muted-foreground hover:text-destructive focus-ring" aria-label={`Remove ${item.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-semibold text-primary">{money(subtotal)}</span>
              </div>
              <p className="text-sm text-muted-foreground">Shipping and tax are calculated at checkout.</p>
              {error && (
                <p role="alert" className="text-sm text-destructive flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}
              <button
                type="button"
                onClick={checkout}
                disabled={pending}
                className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-base font-semibold hover:brightness-110 transition-all focus-ring min-h-[48px] disabled:opacity-60"
              >
                <Lock className="h-4 w-4" />
                {pending ? "Starting secure checkout..." : "Checkout"}
              </button>
              <p className="text-xs text-center text-muted-foreground">Payments are processed securely by Stripe.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
