
import { useEffect, useState } from "react";
import { renderCanvas } from "@/components/ui/canvas";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FileUpload from "@/components/dashboard/FileUpload";
import ProcessingState from "@/components/dashboard/ProcessingState";
import ResultDisplay from "@/components/dashboard/ResultDisplay";
import ChatInterface from "@/components/dashboard/ChatInterface";
import { processPoshDocument, PoshAnalysisResult } from "@/lib/ai-service.lib";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

type DashboardState = "upload" | "processing" | "result" | "chat";

export default function Dashboard() {
  const [state, setState] = useState<DashboardState>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<PoshAnalysisResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    renderCanvas();
  }, []);

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setState("processing");

    try {
      const result = await processPoshDocument(file);
      setAnalysisResult(result);
      setState("result");
    } catch (error) {
      console.error("Processing failed:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your document. Please try again or check your API key.",
        variant: "destructive",
      });
      setState("upload");
    }
  };

  const handleProcessingComplete = () => {
    // This is now handled by the async processPoshDocument in handleFileUpload
  };

  const handleStartChat = () => {
    setState("chat");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-x-hidden">
      {/* Canvas Background */}
      <canvas
        className="pointer-events-none fixed inset-0 z-0"
        id="canvas"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
          <AnimatePresence mode="wait">
            {state === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="text-center mb-12 space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-black tracking-tight text-primary"
                  >
                    Judicial Analysis <span className="text-accent underline decoration-accent/30 underline-offset-8">Portal</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                  >
                    Submit your case documentation for comprehensive AI-driven legal evaluation under the POSH Act, 2013 standards.
                  </motion.p>
                </div>
                <FileUpload onUpload={handleFileUpload} />
              </motion.div>
            )}

            {state === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full"
              >
                <ProcessingState onComplete={handleProcessingComplete} />
              </motion.div>
            )}

            {state === "result" && analysisResult && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="w-full"
              >
                <div className="text-center mb-10 space-y-2">
                  <h2 className="text-3xl font-bold text-primary">Analysis Results</h2>
                  <p className="text-muted-foreground">Comprehensive evaluation of {uploadedFile?.name}</p>
                </div>
                <ResultDisplay data={analysisResult} onStartChat={handleStartChat} />
              </motion.div>
            )}

            {state === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-primary">Consultation Mode</h2>
                </div>
                <ChatInterface analysisResult={analysisResult} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer info */}
        <footer className="relative z-10 p-6 text-center text-xs text-muted-foreground/50 font-medium tracking-widest uppercase mt-auto">
          © 2026 Legal AI Dynamics • Secure Infrastructure v2.4.1
        </footer>
      </div>
    </div>
  );
}
