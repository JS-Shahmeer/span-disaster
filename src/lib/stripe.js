import "server-only";
import Stripe from "stripe";

// STRIPE_API_BASE points the client at a local mock for testing (e.g. http://localhost:12111).
function clientOptions() {
  if (!process.env.STRIPE_API_BASE) return undefined;
  const url = new URL(process.env.STRIPE_API_BASE);
  return { host: url.hostname, port: url.port, protocol: url.protocol.replace(":", "") };
}

export const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, clientOptions()) : null;

// Countries Stripe Checkout accepts shipping addresses for. Comma-separated ISO codes.
export const shippingCountries = (process.env.STRIPE_SHIPPING_COUNTRIES || "US")
  .split(",")
  .map((c) => c.trim().toUpperCase())
  .filter(Boolean);
