import { motion } from "framer-motion";
import { FileText, Search, Brain, Zap, Shield, BarChart } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Intelligent Document Synthesis",
    description: "Upload multiple case files and let AI extract key facts, legal issues, and arguments automatically with OCR support for scanned documents.",
    color: "text-accent",
  },
  {
    icon: Search,
    title: "Semantic Precedent Search",
    description: "Find relevant case laws using natural language queries. Our AI understands legal context and ranks precedents by relevance and jurisdiction.",
    color: "text-teal",
  },
  {
    icon: Brain,
    title: "AI-Powered Dossier Generation",
    description: "Automatically generate comprehensive case dossiers with facts, issues, precedents, and citation-aware legal arguments in seconds.",
    color: "text-indigo",
  },
  {
    icon: Zap,
    title: "Real-Time Citation Mapping",
    description: "Visualize citation networks between cases. Discover how precedents relate to each other with interactive timeline views.",
    color: "text-saffron",
  },
  {
    icon: Shield,
    title: "Jurisdiction-Aware Filtering",
    description: "Filter results by Supreme Court, High Courts, District Courts, or specific jurisdictions. Ensure compliance with local legal frameworks.",
    color: "text-primary",
  },
  {
    icon: BarChart,
    title: "Advanced Analytics Dashboard",
    description: "Track research patterns, case outcomes, and precedent trends. Make data-driven decisions with comprehensive legal analytics.",
    color: "text-secondary",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 relative">
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
            Powerful Features for <span className="gradient-text">Modern Legal Research</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leverage cutting-edge AI technology to transform how you research, analyze, and present legal arguments
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="glass-card p-8 h-full hover-tilt group cursor-pointer">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-${feature.color.split('-')[1]}/20 to-${feature.color.split('-')[1]}/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
