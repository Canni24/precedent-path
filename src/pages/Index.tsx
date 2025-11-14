import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { DemoSearchSection } from "@/components/DemoSearchSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { TechStackSection } from "@/components/TechStackSection";
import { CTASection } from "@/components/CTASection";
import { useEffect } from "react";
import { renderCanvas } from "@/components/ui/canvas";

const Index = () => {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Canvas Background for entire landing page */}
      <canvas
        className="pointer-events-none fixed inset-0 z-0"
        id="canvas"
      />
      
      <div className="relative z-10">
        <Hero />
        <FeaturesSection />
        <HowItWorksSection />
        <DemoSearchSection />
        <UseCasesSection />
        <TechStackSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;