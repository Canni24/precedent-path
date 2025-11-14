import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Network, ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Case {
  id: string;
  title: string;
  citations: number;
  tags: string[];
}

interface CitationNetworkProps {
  cases: Case[];
}

export const CitationNetwork = ({ cases }: CitationNetworkProps) => {
  const sortedCases = [...cases].sort((a, b) => (b.citations || 0) - (a.citations || 0));
  const topCases = sortedCases.slice(0, 10);

  const getNodeSize = (citations: number) => {
    const maxCitations = Math.max(...topCases.map(c => c.citations || 0));
    return 40 + (citations / maxCitations) * 60;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-y-auto p-6 space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Citation Network</h2>
        <p className="text-muted-foreground">
          Visualize relationships between cases based on citations
        </p>
      </div>

      {/* Network Visualization */}
      <Card className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <Network className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Most Cited Cases</h3>
        </div>

        <div className="relative min-h-[500px] bg-background/50 rounded-lg border border-border p-8">
          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-4 border-primary"
            >
              <Network className="w-12 h-12 text-primary" />
            </motion.div>
          </div>

          {/* Case Nodes */}
          {topCases.map((caseItem, idx) => {
            const angle = (idx / topCases.length) * 2 * Math.PI;
            const radius = 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const size = getNodeSize(caseItem.citations || 0);

            return (
              <motion.div
                key={caseItem.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="absolute top-1/2 left-1/2 group"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                {/* Connection Line */}
                <svg
                  className="absolute top-1/2 left-1/2 pointer-events-none"
                  style={{
                    width: Math.abs(x) + 50,
                    height: Math.abs(y) + 50,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <line
                    x1="50%"
                    y1="50%"
                    x2={x > 0 ? "0%" : "100%"}
                    y2={y > 0 ? "0%" : "100%"}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-border group-hover:text-primary transition-colors"
                    strokeDasharray="4 4"
                  />
                </svg>

                {/* Node */}
                <div
                  className="relative rounded-full bg-card border-2 border-border group-hover:border-secondary transition-all cursor-pointer flex items-center justify-center shadow-lg"
                  style={{ width: size, height: size }}
                >
                  <div className="text-center p-2">
                    <p className="text-xs font-bold">{caseItem.citations}</p>
                    <p className="text-[0.5rem] text-muted-foreground">citations</p>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="bg-card border border-border rounded-lg p-3 shadow-xl whitespace-nowrap max-w-xs">
                      <p className="font-semibold text-sm mb-2 line-clamp-2">{caseItem.title}</p>
                      <div className="flex flex-wrap gap-1">
                        {caseItem.tags.slice(0, 3).map((tag, tagIdx) => (
                          <Badge key={tagIdx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Top Citations List */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Highly Cited Cases</h3>
        </div>

        <div className="space-y-3">
          {topCases.map((caseItem, idx) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-4 bg-background rounded-lg border border-border hover:border-secondary transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-primary">#{idx + 1}</span>
                    <h4 className="font-semibold line-clamp-2">{caseItem.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {caseItem.tags.map((tag, tagIdx) => (
                      <Badge key={tagIdx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{caseItem.citations}</p>
                    <p className="text-xs text-muted-foreground">citations</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
