import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { AboutSection } from "@/components/AboutSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { TechStackSection } from "@/components/TechStackSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
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
        className="pointer-events-none fixed inset-0 z-[1]"
        id="canvas"
      />
      
      <div className="relative z-[5]">
        <Navbar />
        <div id="home">
          <Hero />
        </div>
        <div id="features">
          <FeaturesSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <HowItWorksSection />
        <UseCasesSection />
        <TechStackSection />
        <CTASection />
        <div id="contact">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;