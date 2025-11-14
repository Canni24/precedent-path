import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SearchPanel } from "@/components/SearchPanel";
import { renderCanvas } from "@/components/ui/canvas";
import { ResultsViewer } from "@/components/ResultsViewer";
import { DossierPanel } from "@/components/DossierPanel";
import { SettingsModal } from "@/components/SettingsModal";
import { Button } from "@/components/ui/button";
import { Scale, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock data
const mockResults = [
  {
    id: "1",
    title: "Satyabrata Ghose v. Mugneeram Bangur & Co.",
    court: "Supreme Court of India",
    date: "10 Dec 1954",
    tags: ["Contract Law", "Frustration", "Impossibility"],
    relevance: 94,
    snippet:
      "The doctrine of frustration applies when supervening events make the performance of a contract impossible or illegal...",
    citations: 342,
  },
  {
    id: "2",
    title: "Kailash Nath Associates v. Delhi Development Authority",
    court: "Supreme Court of India",
    date: "15 Mar 2015",
    tags: ["Specific Performance", "Real Estate", "Contract"],
    relevance: 87,
    snippet:
      "Specific performance is a discretionary remedy and the court must balance equities between the parties...",
    citations: 198,
  },
  {
    id: "3",
    title: "Hadley v. Baxendale",
    court: "Court of Exchequer",
    date: "23 Feb 1854",
    tags: ["Damages", "Remoteness", "Contract"],
    relevance: 81,
    snippet:
      "Damages recoverable for breach of contract are those which may fairly and reasonably be considered arising naturally...",
    citations: 1247,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [results, setResults] = useState(mockResults);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  useEffect(() => {
    renderCanvas();
  }, []);

  const handleSearch = (query: string, filters: any) => {
    toast.success(`Searching for: ${query}`);
    // Simulate search - in real app, this would call API
    setResults(mockResults);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  return (
    <div className="h-screen flex flex-col bg-background relative">
      {/* Canvas Background */}
      <canvas
        className="pointer-events-none absolute inset-0 z-0"
        id="canvas"
      />
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">JuriSynch</h1>
              <p className="text-xs text-muted-foreground">Legal Research Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content - Three Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Search */}
        <div className="w-80 flex-shrink-0 overflow-hidden">
          <SearchPanel onSearch={handleSearch} />
        </div>

        {/* Center Panel - Results */}
        <div className="flex-1 overflow-hidden">
          <ResultsViewer
            results={results}
            onSelectResult={setSelectedResult}
          />
        </div>

        {/* Right Panel - Dossier */}
        <div className="w-96 flex-shrink-0 overflow-hidden">
          <DossierPanel />
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}