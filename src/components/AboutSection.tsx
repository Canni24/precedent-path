import { motion } from "framer-motion";
import { Target, Users, Zap, Shield, Award, TrendingUp, Heart, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { value: "50K+", label: "Legal Professionals", icon: Users },
  { value: "2M+", label: "Cases Analyzed", icon: TrendingUp },
  { value: "99.9%", label: "Uptime Guarantee", icon: Shield },
  { value: "150+", label: "Jurisdictions Covered", icon: Globe },
];

const values = [
  {
    icon: Target,
    title: "Precision & Accuracy",
    description: "We understand that in legal research, accuracy isn't optional—it's everything. Our AI is trained on verified legal databases and continuously validated by legal experts.",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Speed Meets Intelligence",
    description: "What takes hours of manual research now takes minutes. But we never compromise accuracy for speed—our AI enhances human expertise, not replaces it.",
    color: "text-saffron",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Your cases are confidential. We employ bank-level encryption, comply with data protection regulations, and never share your research data with third parties.",
    color: "text-judicial-gold",
  },
  {
    icon: Heart,
    title: "Built by Lawyers, for Lawyers",
    description: "Our team includes practicing lawyers and legal researchers who understand your challenges because they've lived them. Every feature solves a real problem.",
    color: "text-accent",
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded by a team of lawyers frustrated with outdated research tools. Started with a simple vision: make legal research faster and smarter.",
  },
  {
    year: "2021",
    title: "AI Integration",
    description: "Launched our first AI-powered search engine after processing over 500,000 Indian legal cases. Reduced research time by 70% for early adopters.",
  },
  {
    year: "2022",
    title: "Rapid Growth",
    description: "Expanded to 25+ High Courts and Supreme Court database. Reached 10,000 legal professionals using our platform daily.",
  },
  {
    year: "2023",
    title: "Innovation Awards",
    description: "Recognized as 'Best Legal Tech Innovation' by the Indian Legal Tech Forum. Introduced collaborative research tools and analytics.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Serving 50,000+ legal professionals across India. Launched advanced dossier generation and citation mapping. The journey continues...",
  },
];

export const AboutSection = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            About Us
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Revolutionizing Legal Research <br />
            <span className="gradient-text">One Case at a Time</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize access to legal intelligence by combining cutting-edge 
            AI with deep legal expertise. Because justice moves faster when research doesn't slow you down.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Card className="glass-card p-6 text-center hover-tilt group cursor-pointer border-border/50 hover:border-primary/30 transition-all">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Card className="glass-card p-12 border-primary/20">
            <div className="max-w-4xl mx-auto text-center">
              <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe that every lawyer, regardless of firm size or resources, deserves access to 
                world-class legal research tools. By harnessing the power of artificial intelligence and 
                machine learning, we're leveling the playing field and empowering legal professionals to 
                deliver better outcomes for their clients.
              </p>
              <p className="text-lg text-foreground leading-relaxed font-medium">
                Our platform isn't just about finding cases faster—it's about understanding them deeper, 
                connecting them smarter, and presenting them more effectively.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">What Drives Us</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values shape every decision we make and every feature we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="glass-card p-8 h-full hover-tilt group cursor-pointer border-border/50 hover:border-primary/30 transition-all">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all">
                        <Icon className={`w-7 h-7 ${value.color}`} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {value.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small team with a big vision to India's leading legal research platform
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`relative flex items-center ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Year Dot */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background transform md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${idx % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <Card className="glass-card p-6 hover-tilt group cursor-pointer border-border/50 hover:border-primary/30 transition-all">
                      <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-lg font-bold">
                        {item.year}
                      </Badge>
                      <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <Card className="glass-card p-12 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">The Future of Legal Research</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
              We're just getting started. As AI technology evolves and legal practice transforms, 
              we're committed to staying at the forefront—continuously innovating, learning, and 
              improving to serve you better.
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium">Join us in shaping the future of law</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
