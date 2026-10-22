"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Download, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

// Keeps the original button styling; `className` and `iconClassName` come from the caller.
export default function AddToCartButton({ product, className, iconClassName = "h-5 w-5" }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const isFree = product.price === 0;
  const purchasable = typeof product.price === "number" && product.price > 0;

  const onClick = (e) => {
    // The shop cards wrap this button in a link to the product page.
    e.preventDefault();
    e.stopPropagation();
    if (isFree) {
      router.push("/resources");
      return;
    }
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (isFree) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <Download className={iconClassName} />
        Download Free
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={!purchasable} className={className}>
      {added ? <Check className={iconClassName} /> : <ShoppingCart className={iconClassName} />}
      {!purchasable ? "Coming Soon" : added ? "Added to Cart" : "Add to Cart"}
    </button>
  );
}
