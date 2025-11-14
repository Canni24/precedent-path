import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, ArrowRight, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const popularSearches = [
  "Contract breach remedies",
  "Criminal defamation precedents",
  "Property dispute jurisdiction",
  "Consumer protection act interpretation",
  "Anticipatory bail conditions",
];

export const DemoSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("/dashboard");
    }
  };

  const handlePopularSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-background">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-accent/20 via-transparent to-secondary/20" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Try <span className="gradient-text">Live Search</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience semantic legal search powered by advanced NLP models
          </p>
        </motion.div>

        {/* Search card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card p-8 md:p-12">
            {/* Search input */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="e.g., 'Landmark judgments on right to privacy'"
                  className="pl-12 h-14 text-lg bg-background/50 border-border"
                />
              </div>
              <Button
                size="lg"
                onClick={handleSearch}
                className="bg-primary hover:bg-primary-hover h-14 px-8 group"
              >
                Search Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Popular searches */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Popular Searches:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((query, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 + idx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePopularSearch(query)}
                    className="px-4 py-2 rounded-full bg-accent/10 hover:bg-accent/20 text-sm font-medium transition-colors border border-accent/20"
                  >
                    {query}
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Judgments", value: "10M+" },
            { label: "Search Speed", value: "<2s" },
            { label: "Accuracy", value: "94%" },
            { label: "Courts", value: "All India" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
