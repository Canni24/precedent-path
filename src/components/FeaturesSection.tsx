import { motion } from "framer-motion";
import { FileText, Search, Brain, Zap, Shield, BarChart, BookOpen, Scale, Users, Clock, Database, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    icon: FileText,
    title: "Intelligent Document Synthesis",
    description: "Transform your legal research workflow with advanced AI-powered document analysis that understands context, extracts critical information, and synthesizes complex legal documents into actionable insights.",
    details: [
      "OCR support for scanned documents and handwritten notes",
      "Multi-language document processing with translation",
      "Automatic fact extraction and timeline generation",
      "Cross-reference detection across multiple documents"
    ],
    color: "text-accent",
    badge: "AI-Powered",
  },
  {
    icon: Search,
    title: "Semantic Precedent Search",
    description: "Go beyond keyword matching with our advanced semantic search engine that understands legal nuances, context, and relationships between cases to deliver precisely relevant precedents.",
    details: [
      "Natural language query processing",
      "Relevance ranking by jurisdiction and citation strength",
      "Similar case clustering and pattern detection",
      "Historical precedent tracking across decades"
    ],
    color: "text-judicial-gold",
    badge: "Smart Search",
  },
  {
    icon: Brain,
    title: "AI-Powered Dossier Generation",
    description: "Generate comprehensive, court-ready case dossiers in seconds. Our AI analyzes facts, identifies legal issues, suggests relevant precedents, and drafts citation-aware arguments.",
    details: [
      "Automated legal issue identification and categorization",
      "Precedent suggestion with citation formatting",
      "Argument structure generation based on case law",
      "Customizable templates for different case types"
    ],
    color: "text-indigo",
    badge: "Auto-Generate",
  },
  {
    icon: Zap,
    title: "Real-Time Citation Mapping",
    description: "Visualize the evolution of legal principles through interactive citation networks. Understand how cases influence each other and track the development of legal doctrines over time.",
    details: [
      "Interactive citation network visualization",
      "Timeline view of precedent evolution",
      "Influential case identification and ranking",
      "Citation strength analysis and validation"
    ],
    color: "text-saffron",
    badge: "Visual Analytics",
  },
  {
    icon: Shield,
    title: "Jurisdiction-Aware Filtering",
    description: "Ensure legal accuracy with sophisticated jurisdiction filtering. Our system understands the hierarchy of courts and the applicability of precedents across different legal frameworks.",
    details: [
      "Multi-tier court hierarchy support (Supreme, High, District)",
      "State and union territory specific filtering",
      "Binding vs persuasive precedent classification",
      "Jurisdiction conflict resolution assistance"
    ],
    color: "text-primary",
    badge: "Compliance",
  },
  {
    icon: BarChart,
    title: "Advanced Analytics Dashboard",
    description: "Make data-driven legal decisions with comprehensive analytics. Track research patterns, analyze case outcomes, identify trends, and benchmark against historical data.",
    details: [
      "Case outcome prediction and trend analysis",
      "Judge and court performance insights",
      "Research time tracking and optimization",
      "Success rate analysis by case type and argument"
    ],
    color: "text-secondary",
    badge: "Insights",
  },
  {
    icon: BookOpen,
    title: "Legal Knowledge Base",
    description: "Access a comprehensive, continuously updated repository of legal principles, statutes, and precedents. Built-in explanations make complex legal concepts accessible.",
    details: [
      "Statute and act database with amendments",
      "Legal term glossary with case law references",
      "Scholarly article and commentary integration",
      "Regular updates with latest judgments"
    ],
    color: "text-judicial-maroon",
    badge: "Knowledge Hub",
  },
  {
    icon: Scale,
    title: "Argument Strength Analyzer",
    description: "Evaluate the strength of legal arguments using AI-powered analysis. Identify weaknesses, suggest improvements, and predict counterarguments before they arise.",
    details: [
      "Precedent strength scoring and validation",
      "Logical consistency checking",
      "Counterargument prediction and preparation",
      "Citation quality assessment"
    ],
    color: "text-teal",
    badge: "Strategy",
  },
  {
    icon: Users,
    title: "Collaborative Research Tools",
    description: "Work seamlessly with your legal team. Share research, annotate cases, and collaborate on dossiers with real-time synchronization and version control.",
    details: [
      "Real-time collaborative editing and annotations",
      "Team workspace with role-based access control",
      "Research history and version tracking",
      "Integrated communication and task management"
    ],
    color: "text-accent",
    badge: "Team Work",
  },
  {
    icon: Clock,
    title: "Case Timeline Generator",
    description: "Automatically create visual timelines of case events, procedural history, and key dates. Track deadlines and get intelligent reminders for important milestones.",
    details: [
      "Automated event extraction from documents",
      "Interactive timeline visualization",
      "Deadline tracking with smart notifications",
      "Procedural history compilation"
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
    title: "Precedent Impact Tracking",
    description: "Monitor how precedents are being applied in recent cases. Get alerts when important cases cite your key precedents, and track shifting legal interpretations.",
    details: [
      "Real-time precedent usage monitoring",
      "Impact score calculation for landmark cases",
      "Trend alerts for changing interpretations",
      "Comparative analysis across jurisdictions"
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
