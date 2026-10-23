import Contact from "@/views/Contact";

export const metadata = {
  title: "Contact",
  description: "Get in touch with SPAN Disaster Services.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <Contact />;
}
