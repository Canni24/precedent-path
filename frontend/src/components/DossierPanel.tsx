import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Edit, FileText, BookOpen, Gavel, Clock } from "lucide-react";
import { toast } from "sonner";

interface Precedent {
  title: string;
  court: string;
  date: string;
  rationale: string;
}

interface DossierPanelProps {
  facts?: string[];
  issues?: string[];
  precedents?: Precedent[];
  timeline?: Array<{ date: string; event: string }>;
}

export const DossierPanel = ({ facts = [], issues = [], precedents = [], timeline = [] }: DossierPanelProps) => {
  const handleExport = (format: string) => {
    toast.success(`Exporting dossier as ${format}...`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col bg-card border-l border-border"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Auto-Generated Dossier</h2>
          <Badge variant="secondary" className="animate-pulse">
            <span className="w-2 h-2 bg-secondary rounded-full mr-2" />
            Live
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          AI-synthesized case summary with citations
        </p>
      </div>

      {/* Export Actions */}
      <div className="p-6 border-b border-border">
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-primary-hover"
            onClick={() => handleExport("PDF")}
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => handleExport("DOCX")}
          >
            <Download className="w-4 h-4 mr-2" />
            Export DOCX
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Facts Section */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold">Key Facts</h3>
          </div>
          <ul className="space-y-2">
            {facts.length > 0 ? (
              facts.map((fact, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-secondary"
                >
                  {fact}
                </motion.li>
              ))
            ) : (
              <>
                <li className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-secondary">
                  Contract entered on 15 Jan 2023 between parties
                </li>
                <li className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-secondary">
                  Breach occurred on 30 Jun 2023
                </li>
                <li className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-secondary">
                  Damages claimed: ₹50,00,000
                </li>
              </>
            )}
          </ul>
        </Card>

        {/* Legal Issues */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gavel className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Legal Issues</h3>
          </div>
          <ul className="space-y-2">
            {issues.length > 0 ? (
              issues.map((issue, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent"
                >
                  {issue}
                </motion.li>
              ))
            ) : (
              <>
                <li className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent">
                  Whether contractual breach is established?
                </li>
                <li className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent">
                  Quantum of damages and compensation
                </li>
                <li className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent">
                  Applicability of specific performance
                </li>
              </>
            )}
          </ul>
        </Card>

        {/* Top Precedents */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo" />
              <h3 className="text-lg font-semibold">Top 5 Precedents</h3>
            </div>
            <Button size="sm" variant="ghost">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {precedents.length > 0 ? (
              precedents.map((precedent, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold flex-1">{precedent.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      #{idx + 1}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {precedent.court} • {precedent.date}
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    "{precedent.rationale}"
                  </p>
                </motion.div>
              ))
            ) : (
              <>
                {[
                  {
                    title: "Hadley v Baxendale (1854)",
                    court: "Court of Exchequer",
                    date: "23 Feb 1854",
                    rationale:
                      "Establishes remoteness test for contractual damages",
                  },
                  {
                    title: "Satyabrata Ghose v Mugneeram (1954)",
                    court: "Supreme Court of India",
                    date: "10 Dec 1954",
                    rationale:
                      "Landmark case on doctrine of frustration of contract",
                  },
                  {
                    title: "Kailash Nath v State of U.P. (1957)",
                    court: "Supreme Court of India",
                    date: "15 Mar 1957",
                    rationale:
                      "Defines principles of specific performance remedy",
                  },
                ].map((precedent, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold flex-1">
                        {precedent.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        #{idx + 1}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {precedent.court} • {precedent.date}
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      "{precedent.rationale}"
                    </p>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Statute Timeline</h3>
          </div>
          <div className="space-y-4">
            {[
              { date: "1872", event: "Indian Contract Act enacted" },
              { date: "1963", event: "Specific Relief Act enacted" },
              { date: "2018", event: "Specific Relief Act amended" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-20 flex-shrink-0 text-sm font-semibold text-primary">
                  {item.date}
                </div>
                <div className="flex-1">
                  <div className="h-full border-l-2 border-primary/30 pl-4 pb-4">
                    <p className="text-sm text-muted-foreground">{item.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Manual Notes */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Manual Notes</h3>
            <Button size="sm" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
          <p className="text-sm text-muted-foreground italic">
            No manual notes added yet
          </p>
        </Card>
      </div>
    </motion.div>
  );
};