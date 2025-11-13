import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, FileText, Calendar, MapPin, TrendingUp, Copy } from "lucide-react";
import { toast } from "sonner";

interface Result {
  id: string;
  title: string;
  court: string;
  date: string;
  tags: string[];
  relevance: number;
  snippet: string;
  fullText?: string;
  citations?: number;
}

interface ResultsViewerProps {
  results: Result[];
  onSelectResult: (result: Result) => void;
}

export const ResultsViewer = ({ results, onSelectResult }: ResultsViewerProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col bg-background"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">Search Results</h2>
            <p className="text-sm text-muted-foreground">
              Found {results.length} relevant precedents
            </p>
          </div>
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Sort by Relevance
          </Button>
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {results.map((result, idx) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Card className="p-6 hover-tilt cursor-pointer border-2 hover:border-secondary transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3
                    className="text-lg font-semibold mb-2 hover:text-secondary transition-colors"
                    onClick={() => onSelectResult(result)}
                  >
                    {result.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {result.court}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {result.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {result.citations || 0} citations
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(result.title)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {result.tags.map((tag, tagIdx) => (
                  <Badge key={tagIdx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Relevance Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Relevance Score</span>
                  <span className="font-medium">{result.relevance}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.relevance}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full ${
                      result.relevance > 80
                        ? "bg-secondary"
                        : result.relevance > 60
                        ? "bg-accent"
                        : "bg-primary"
                    }`}
                  />
                </div>
              </div>

              {/* Snippet */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {result.snippet}
              </p>

              {/* Expand Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setExpandedId(expandedId === result.id ? null : result.id)
                }
                className="w-full justify-between"
              >
                <span>
                  {expandedId === result.id ? "Hide" : "Show"} full text
                </span>
                {expandedId === result.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>

              {/* Expanded Content */}
              {expandedId === result.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <div className="prose prose-sm max-w-none text-foreground">
                    <p className="text-sm leading-relaxed">
                      {result.fullText ||
                        "Full judgment text would be displayed here with highlighted passages and citation links..."}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-secondary hover:bg-secondary-hover">
                      Add to Dossier
                    </Button>
                    <Button size="sm" variant="outline">
                      View Citations
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};