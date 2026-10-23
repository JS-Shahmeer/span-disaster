"use client";

import { useEffect } from "react";
import { useCart } from "@/components/cart/CartProvider";

export default function ClearCart() {
  const { clear, loaded } = useCart();
  useEffect(() => {
    if (loaded) clear();
  }, [loaded, clear]);
  return null;
}
