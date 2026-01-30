
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ShieldCheck, FileSearch, Gavel, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const processingSteps = [
  { icon: FileSearch, text: "Scanning document contents...", duration: 5000 },
  { icon: ShieldCheck, text: "Verifying compliance standards...", duration: 8000 },
  { icon: Scale, text: "Analyzing legal precedents...", duration: 10000 },
  { icon: Gavel, text: "Generating final judicial opinion...", duration: 7000 },
];

export default function ProcessingState({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const totalDuration = processingSteps.reduce((acc, step) => acc + step.duration, 0);
    const interval = 100; // ms
    const increment = (interval / totalDuration) * 100;

    progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    const runSteps = async () => {
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentStep(i);
        await new Promise((resolve) => setTimeout(resolve, processingSteps[i].duration));
      }
      onComplete();
    };

    runSteps();

    return () => {
      clearInterval(progressTimer);
      clearTimeout(stepTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-2xl mx-auto space-y-12 p-8">
      <div className="relative">
        {/* Decorative Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-8 border-2 border-dashed border-accent/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-16 border border-dashed border-primary/10 rounded-full"
        />

        <div className="relative z-10 p-12 bg-card/50 backdrop-blur-xl rounded-full border border-border shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.5, rotate: 20 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative"
            >
              {React.createElement(processingSteps[currentStep].icon, {
                className: "w-20 h-20 text-accent",
              })}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2"
              >
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Analysis in Progress
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-lg text-muted-foreground font-medium h-6"
            >
              {processingSteps[currentStep].text}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-3 rounded-full bg-muted shadow-inner" />
          <div className="flex justify-between text-sm font-semibold text-muted-foreground px-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 w-full opacity-50">
        {processingSteps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-colors duration-500",
              index <= currentStep ? "bg-accent" : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
