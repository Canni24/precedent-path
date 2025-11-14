import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Search, Scale, TrendingUp, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Hero as HelixHero } from "@/components/ui/helix-hero";
import { useEffect } from "react";
import { renderCanvas } from "@/components/ui/canvas";

export const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    renderCanvas();
  }, []);

  const stats = [
    { icon: TrendingUp, value: "2M+", label: "Indexed Documents" },
    { icon: Clock, value: "<2s", label: "Avg. Retrieval Time" },
    { icon: Target, value: "94%", label: "Precision@5" },
  ];

  return (
    <section className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Canvas Background */}
      <canvas
        className="pointer-events-none absolute inset-0 z-0"
        id="canvas"
      />
      
      {/* Grid Layout: Left Content, Right Helix */}
      <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 z-10">
        
        {/* Left Side - Content */}
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <Scale className="w-10 h-10 text-accent" />
            <span className="text-2xl font-bold text-foreground">JuriSynch</span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-accent/10 w-fit"
          >
            <Scale className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">AI-Powered Legal Research</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Faster, Fairer
            <br />
            <span className="gradient-text">Legal Research</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl"
          >
            AI-powered synthesis platform that transforms case files into comprehensive dossiers.
            Find precedents, generate citations, and navigate complex legal research in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all group"
              onClick={() => navigate("/dashboard")}
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Case Files
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:bg-accent/10 hover:border-accent transition-all"
              onClick={() => navigate("/dashboard")}
            >
              <Search className="w-5 h-5 mr-2" />
              Try Demo Search
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 max-w-xl"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="flex flex-col gap-2"
                >
                  <IconComponent className="w-5 h-5 text-accent mb-1" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Sign In Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-accent"
              onClick={() => navigate("/auth")}
            >
              Already have an account? <span className="ml-1 font-semibold">Sign In</span>
            </Button>
          </motion.div>
        </div>

        {/* Right Side - Helix WebGL Background */}
        <div className="hidden lg:block relative h-full">
          <div className="absolute inset-0">
            <HelixHero title="" description="" />
          </div>
        </div>

        {/* Mobile: Helix as Background */}
        <div className="lg:hidden absolute inset-0 opacity-20 pointer-events-none">
          <HelixHero title="" description="" />
        </div>
      </div>
    </section>
  );
};