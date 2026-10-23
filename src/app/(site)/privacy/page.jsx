import Legal from "@/views/Legal";

export const metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function Page() {
  return <Legal pathname="/privacy" />;
}
