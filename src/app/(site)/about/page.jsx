import About from "@/views/About";

export const metadata = {
  title: "About SPAN",
  description: "The history, experience, programs, and disaster response background behind SPAN Disaster Services.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <About />;
}
