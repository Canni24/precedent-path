import { motion } from "framer-motion";
import { FileText, Search, Brain, Zap, Shield, BarChart, BookOpen, Scale, Users, Clock, Database, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: FileText,
    title: "Intelligent Contract Analysis",
    description: "Transform complex contracts into clear, actionable insights using AI trained on Indian legal principles.",
    details: [
      "PDF, DOCX & scanned contract support (OCR)",
      "Clause-level breakdown and categorization",
      "Automatic detection of risky and unfair terms",
      "Structured summaries for quick understanding"
    ],
    color: "text-accent",
    badge: "AI-Powered",
  },
  {
    icon: Search,
    title: "Semantic Clause Risk Detection",
    description: "Go beyond keyword matching with our advanced semantic search engine that understands legal nuances, context, and relationships between cases to deliver precisely relevant precedents.",
    details: [
      "Context-aware clause interpretation",
      "Detection of hidden non-compete and restraint clauses",
      "Identification of unfair penalties and IP transfers",
      "Risk ranking based on clause severity"
    ],
    color: "text-judicial-gold",
    badge: "Smart Search",
  },
  {
    icon: Brain,
    title: "Explainable Risk Scoring",
    description: "Generate comprehensive, court-ready case dossiers in seconds. Our AI analyzes facts, identifies legal issues, suggests relevant precedents, and drafts citation-aware arguments.",
    details: [
      "Overall contract risk score (0–100)",
      "Clause-wise severity indicators",
      "Indian law references for each flagged risk",
      "Plain-language (ELI5) explanations for non-lawyers"
    ],
    color: "text-indigo",
    badge: "Auto-Generate",
  },
  {
    icon: Zap,
    title: "Statutory Compliance Mapping",
    description: "Analyze contracts directly against Indian statutory provisions.",
    details: [
      "Indian Contract Act, 1872 coverage",
      "Section 27 (Restraint of Trade) detection",
      "Section 23 (Unlawful Object) identification",
      "Section-wise legal justification for every flag"
    ],
    color: "text-saffron",
    badge: "Visual Analytics",
  },
  {
    icon: Shield,
    title: "Fairness & Deviation Analysi",
    description: "Compare contracts against standard “fair” agreement templates to surface unusually harsh terms.",
    details: [
      "Deviation detection from balanced contract norms",
      "One-sided obligation identification",
      "Excessive termination and indemnity clauses",
      "Freelancer- and startup-friendly benchmarking"
    ],
    color: "text-primary",
    badge: "Compliance",
  },
  {
    icon: BarChart,
    title: "Interactive Risk Dashboard",
    description: "Visualize contract risks clearly with an intuitive dashboard.",
    details: [
      "Clause-level risk heat indicators",
      "Risk distribution charts",
      "Highlighted problem sections",
      "Quick navigation to high-risk clauses"
    ],
    color: "text-secondary",
    badge: "Insights",
  },
  {
    icon: BookOpen,
    title: "Legal Knowledge Engine",
    description: "Built-in understanding of Indian contract law concepts for accurate analysis.",
    details: [
      "Indian legal terminology mapping",
      "Clause-to-law reference database",
      "Contextual legal explanations",
      "Regularly updatable legal rule engine"
    ],
    color: "text-judicial-maroon",
    badge: "Knowledge Hub",
  },
  {
    icon: Scale,
    title: "Clause Strength & Impact Analyzer",
    description: "Evaluate how strongly a clause affects your rights and future work.",
    details: [
      "Long-term impact assessment",
      "Employment and IP risk evaluation",
      "Restriction duration and scope analysis",
      "Actionability suggestions (negotiate / remove / accept)"
    ],
    color: "text-teal",
    badge: "Strategy",
  },
  {
    icon: Users,
    title: "Privacy-First Architecture",
    description: "Your contracts never leave your control.",
    details: [
      "In-memory contract processing",
      "Automatic deletion after analysis",
      "No contract data storage",
      "No model training on user documents"
    ],
    color: "text-accent",
    badge: "Team Work",
  },
  {
    icon: Clock,
    title: "Contract Timeline & Obligation Tracker",
    description: "Understand when obligations start, end, or escalate.",
    details: [
      "Duration and expiry detection",
      "Lock-in and notice period analysis",
      "Post-termination restriction timelines",
      "Key obligation summaries"
    ],
    color: "text-indigo",
    badge: "Time Saver",
  },
  {
    icon: Database,
    title: "Secure Document Vault",
    description: "Store and organize all case documents in a secure, encrypted vault. Advanced search and tagging make retrieval instant, while audit logs ensure compliance.",
    details: [
      "End-to-end encryption for sensitive documents",
      "Intelligent auto-tagging and categorization",
      "Full-text search across all stored documents",
      "Compliance-ready audit trails and access logs"
    ],
    color: "text-primary",
    badge: "Security",
  },
  {
    icon: TrendingUp,
    title: "Freelancer & Startup Defense System",
    description: "Built as a first line of defense for individuals without legal teams.",
    details: [
      "Non-compete and exclusivity detection",
      "Unfair IP ownership clauses",
      "Payment risk identification",
      "Plain-English warnings before signing"
    ],
    color: "text-saffron",
    badge: "Trending",
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
          className="text-center mb-20"
        >
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            12 Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Everything You Need for <br />
            <span className="gradient-text">Modern Legal Research</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Leverage cutting-edge AI technology to transform how you research, analyze, and present legal arguments. 
            Built for lawyers, by lawyers.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Card className="glass-card p-8 h-full hover-tilt group cursor-pointer border-border/50 hover:border-primary/30 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium bg-secondary/50 border-secondary/30">
                      {feature.badge}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    {feature.description}
                  </p>

                  {/* Feature Details */}
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    {feature.details.map((detail, detailIdx) => (
                      <motion.div
                        key={detailIdx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 + detailIdx * 0.1 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-2">
            And many more features being added regularly
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Continuously evolving platform</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
