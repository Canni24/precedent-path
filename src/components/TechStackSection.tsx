import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Database, Lock, Zap, Network, FileSearch } from "lucide-react";

const technologies = [
  {
    icon: Brain,
    name: "Advanced NLP",
    description: "Transformer-based models fine-tuned on Indian legal corpus for semantic understanding",
  },
  {
    icon: Database,
    name: "Vector Database",
    description: "High-performance embeddings storage for instant semantic similarity search",
  },
  {
    icon: Lock,
    name: "End-to-End Encryption",
    description: "Bank-grade security ensuring client confidentiality and data protection",
  },
  {
    icon: Zap,
    name: "Real-Time Processing",
    description: "Distributed computing infrastructure for sub-2-second query responses",
  },
  {
    icon: Network,
    name: "Citation Graph Analysis",
    description: "Graph neural networks mapping precedent relationships and influence patterns",
  },
  {
    icon: FileSearch,
    name: "OCR & Document AI",
    description: "Industry-leading OCR with legal document structure recognition",
  },
];

export const TechStackSection = () => {
  return (
    <section className="py-24 px-6 relative bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powered by <span className="gradient-text">Cutting-Edge Technology</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade AI infrastructure purpose-built for the complexity of Indian legal research
          </p>
        </motion.div>

        {/* Technologies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card className="glass-card p-6 h-full hover-tilt group cursor-pointer border-border/50 hover:border-accent/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">{tech.name}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{tech.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 glass-card p-8 rounded-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Model Accuracy", value: "96.8%" },
              { label: "Uptime", value: "99.9%" },
              { label: "API Response", value: "<100ms" },
              { label: "Data Centers", value: "Multi-region" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
