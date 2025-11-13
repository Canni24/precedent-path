import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Briefcase, Users, Building } from "lucide-react";

const useCases = [
  {
    icon: Scale,
    role: "Judges",
    title: "Faster Case Disposition",
    description: "Quickly review precedents, verify citations, and generate comprehensive case summaries. Reduce research time by 70% while maintaining judicial rigor.",
    benefits: ["Instant precedent verification", "Auto-generated case summaries", "Citation network visualization"],
    color: "from-primary to-indigo",
  },
  {
    icon: Briefcase,
    role: "Lawyers",
    title: "Winning Arguments",
    description: "Build stronger cases with AI-powered precedent discovery. Find overlooked judgments and construct citation-aware legal arguments that stand up in court.",
    benefits: ["Semantic precedent search", "Argument drafting assistance", "Multi-jurisdiction coverage"],
    color: "from-accent to-saffron",
  },
  {
    icon: Users,
    role: "Legal Researchers",
    title: "Deep Analysis",
    description: "Analyze legal trends, track judicial patterns, and discover connections between cases. Turn legal data into actionable insights with advanced analytics.",
    benefits: ["Citation trend analysis", "Judicial pattern tracking", "Comparative case studies"],
    color: "from-teal to-secondary",
  },
  {
    icon: Building,
    role: "Law Firms",
    title: "Team Efficiency",
    description: "Centralize legal research across your firm. Share dossiers, maintain institutional knowledge, and reduce billable hours spent on routine research tasks.",
    benefits: ["Collaborative workspaces", "Research template library", "Client-ready exports"],
    color: "from-indigo to-primary",
  },
];

export const UseCasesSection = () => {
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
            Built for Every <span className="gradient-text">Legal Professional</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From judges to law firms, JuriSynch adapts to your unique workflow and requirements
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {useCases.map((useCase, idx) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="glass-card p-8 h-full hover-tilt group cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${useCase.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold">
                      {useCase.role}
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{useCase.description}</p>

                  {/* Benefits list */}
                  <div className="space-y-3">
                    {useCase.benefits.map((benefit, benefitIdx) => (
                      <div key={benefitIdx} className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${useCase.color}`} />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
