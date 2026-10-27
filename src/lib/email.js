import "server-only";

// Sends mail through Resend's HTTP API. Without RESEND_API_KEY it logs and skips,
// so missing email config never breaks a form submission or an order.
export async function sendEmail({ to, subject, text, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from || !to) {
    console.warn(`Email skipped (not configured): ${subject}`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, ...(replyTo && { reply_to: replyTo }) }),
    });
    if (!res.ok) {
      console.error("Email failed", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Email failed", error);
    return false;
  }
}

export function formatMoney(cents, currency = "usd") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}
