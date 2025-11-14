import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Search, Scale, TrendingUp, Clock, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Hero as HelixHero } from "@/components/ui/helix-hero";

export const Hero = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: TrendingUp, value: "2M+", label: "Indexed Documents" },
    { icon: Clock, value: "<2s", label: "Avg. Retrieval Time" },
    { icon: Target, value: "94%", label: "Precision@5" },
  ];

  return (
    <section className="relative h-screen w-screen overflow-hidden">
      {/* Helix WebGL Background - Positioned Absolutely */}
      <div className="absolute inset-0 z-0">
        <HelixHero 
          title="" 
          description=""
        />
      </div>

      {/* Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-indigo/20 to-secondary/30 z-[1]" />

      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center justify-between px-6 md:px-10 py-6"
      >
        <div className="flex items-center gap-3">
          <Scale className="w-8 h-8 text-accent" />
          <span className="text-xl font-bold text-foreground">JuriSynch</span>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="text-foreground hover:text-accent"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </Button>
        </div>
      </motion.nav>

      {/* Hero Content */}
      <div className="relative z-10 h-[calc(100vh-88px)] flex flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/40 backdrop-blur-md"
        >
          <Scale className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">AI-Powered Legal Research</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight max-w-5xl"
        >
          Faster, Fairer
          <br />
          <span className="gradient-text">Legal Research</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-foreground/80 mb-10 max-w-3xl mx-auto"
        >
          AI-powered synthesis platform that transforms case files into comprehensive dossiers.
          Find precedents, generate citations, and navigate complex legal research in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
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
            className="border-2 border-foreground/20 bg-background/30 backdrop-blur-md hover:bg-background/40 hover:border-accent transition-all"
            onClick={() => navigate("/dashboard")}
          >
            <Search className="w-5 h-5 mr-2" />
            Try Demo Search
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 md:p-6 rounded-lg bg-background/40 backdrop-blur-md border border-border/30 hover:bg-background/50 transition-all"
            >
              <stat.icon className="w-6 h-6 text-accent" />
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs md:text-sm text-foreground/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};