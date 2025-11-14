import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Case Files",
    description: "Drag and drop your case documents, judgments, or legal briefs. Our OCR engine processes even scanned PDFs.",
    step: "01",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Advanced NLP models extract facts, identify legal issues, and map relevant sections to precedent databases.",
    step: "02",
  },
  {
    icon: FileCheck,
    title: "Review & Refine",
    description: "Explore semantically-ranked precedents, visualize citation networks, and customize your dossier with manual edits.",
    step: "03",
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Generate citation-aware dossiers in PDF or DOCX format. Share with colleagues or import into case management systems.",
    step: "04",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="gradient-text">JuriSynch</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From upload to export in four simple steps — powered by state-of-the-art legal AI
          </p>
        </motion.div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-teal -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative"
                >
                  <div className="glass-card p-8 rounded-2xl hover-tilt group cursor-pointer h-full flex flex-col items-center text-center">
                    {/* Step number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-10 h-10 text-accent" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
