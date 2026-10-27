"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export default function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="relative p-2 rounded-md hover:bg-muted focus-ring" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
      <ShoppingCart className="h-5 w-5 text-primary" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[0.65rem] font-semibold text-secondary-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
