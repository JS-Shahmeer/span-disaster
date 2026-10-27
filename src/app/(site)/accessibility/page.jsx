import Legal from "@/views/Legal";

export const metadata = { title: "Accessibility Statement", alternates: { canonical: "/accessibility" } };

export default function Page() {
  return <Legal pathname="/accessibility" />;
}
