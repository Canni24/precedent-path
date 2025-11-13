import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { DemoSearchSection } from "@/components/DemoSearchSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { TechStackSection } from "@/components/TechStackSection";
import { CTASection } from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSearchSection />
      <UseCasesSection />
      <TechStackSection />
      <CTASection />
    </div>
  );
};

export default Index;