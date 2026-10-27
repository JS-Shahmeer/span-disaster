import Legal from "@/views/Legal";

export const metadata = { title: "Terms of Use", alternates: { canonical: "/terms" } };

export default function Page() {
  return <Legal pathname="/terms" />;
}
