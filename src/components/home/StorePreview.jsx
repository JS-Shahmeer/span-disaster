import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { Image } from "@/components/ui/image";

const workbookImage = "https://media.base44.com/images/public/6acfc11b88787a633a2cb9f6/8f3366411_generated_8e7872c5.png";

export default function StorePreview() {
  return (
    <section className="bg-background">
      <div className="container-span py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-muted">
              <Image
                src={workbookImage}
                alt="The SPAN Workbook open on a table showing structured educational content"
                className="w-full h-[360px] lg:h-[440px]"
                fittingType="fill"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="The Storefront"
              title="The SPAN Workbook and selected preparedness products."
              description="A small, mission-aligned selection of educational resources and practical tools to support your preparedness efforts."
            />
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <BookOpen className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-muted-foreground">The complete SPAN Workbook with the full program methodology, exercises, and handouts.</p>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-muted-foreground">Curated personal preparedness items to support your household readiness.</p>
              </div>
            </div>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-base font-semibold hover:bg-primary/90 transition-all focus-ring min-h-[48px]"
            >
              Visit the Storefront
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
