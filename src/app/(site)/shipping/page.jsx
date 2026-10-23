import Legal from "@/views/Legal";

export const metadata = { title: "Shipping & Returns", alternates: { canonical: "/shipping" } };

export default function Page() {
  return <Legal pathname="/shipping" />;
}
