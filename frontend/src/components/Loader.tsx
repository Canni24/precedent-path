import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Auto-complete after animations finish
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(onComplete, 800);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Create 24 spokes for Ashoka Chakra
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const angle = (i * 360) / 24;
    return angle;
  });

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={isComplete ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="relative w-48 h-48"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          isComplete
            ? { scale: 3, opacity: 0, rotate: 360 }
            : { scale: 1, opacity: 1, rotate: 0 }
        }
        transition={{
          scale: { duration: isComplete ? 0.8 : 0.8, ease: "easeInOut" },
          opacity: { duration: isComplete ? 0.8 : 0.8 },
          rotate: { duration: isComplete ? 0.8 : 0, ease: "easeInOut" },
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="90"
            stroke="hsl(var(--accent))"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Inner circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="15"
            fill="hsl(var(--accent))"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />

          {/* 24 Spokes */}
          {spokes.map((angle, index) => {
            const x1 = 100 + 15 * Math.cos((angle * Math.PI) / 180);
            const y1 = 100 + 15 * Math.sin((angle * Math.PI) / 180);
            const x2 = 100 + 90 * Math.cos((angle * Math.PI) / 180);
            const y2 = 100 + 90 * Math.sin((angle * Math.PI) / 180);

            return (
              <motion.line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 0.5 + index * 0.05,
                  duration: 0.3,
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Small circles at spoke ends */}
          {spokes.map((angle, index) => {
            const x = 100 + 90 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 90 * Math.sin((angle * Math.PI) / 180);

            return (
              <motion.circle
                key={`dot-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill="hsl(var(--accent))"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 1.8 + index * 0.02,
                  duration: 0.2,
                }}
              />
            );
          })}
        </svg>

        {/* Spinning animation after drawing */}
        <motion.div
          className="absolute inset-0"
          initial={{ rotate: 0 }}
          animate={{ rotate: isComplete ? 0 : 360 }}
          transition={{
            delay: 3,
            duration: 1,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full opacity-0"
            xmlns="http://www.w3.org/2000/svg"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
