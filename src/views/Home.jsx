import Hero from "@/components/home/Hero";
import FirstHour from "@/components/home/FirstHour";
import Pillars from "@/components/home/Pillars";
import SpanMethod from "@/components/home/SpanMethod";
import NeighborhoodProcess from "@/components/home/NeighborhoodProcess";
import Experience from "@/components/home/Experience";
import StartLearning from "@/components/home/StartLearning";
import ResourcesPreview from "@/components/home/ResourcesPreview";
import StorePreview from "@/components/home/StorePreview";
import CTASection from "@/components/shared/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <FirstHour />
      <Pillars />
      <SpanMethod />
      <NeighborhoodProcess />
      <Experience />
      <StartLearning />
      <ResourcesPreview />
      <StorePreview />
      <CTASection
        title="Preparedness works best when we practice together."
        description="Explore the SPAN process and discover how your neighborhood can become ready to respond."
        primaryLabel="Explore the SPAN Process"
        primaryTo="/neighborhood-preparedness"
        secondaryLabel="Start Personal Preparedness"
        secondaryTo="/personal-preparedness"
      />
    </>
  );
}
