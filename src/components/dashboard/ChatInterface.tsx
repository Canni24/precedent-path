
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Scale, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { askPoshClarification, PoshAnalysisResult } from "@/lib/ai-service.lib";

import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  analysisResult: PoshAnalysisResult;
}

export default function ChatInterface({ analysisResult }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `I have analyzed the document. The verdict is ${analysisResult.verdict}. I've identified risks regarding ${analysisResult.riskAssessment.confidentialityRisk.toLowerCase()}. What would you like to clarify regarding the statutory benchmarks or strategic implications?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    // Keep history BEFORE adding the new message
    const previousHistory = messages.map(m => ({
      role: m.role,
      content: m.content
    }));

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      const response = await askPoshClarification(previousHistory, currentInput, analysisResult);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat failed:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-7xl mx-auto h-[700px] flex flex-col p-4"
    >
      <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-2xl bg-card/60 backdrop-blur-xl relative">
        {/* Header */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-primary text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-lg">
              <Scale className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-bold">Judicial AI Assistant</h3>
              <p className="text-xs opacity-70">Expert on POSH Act, 2013</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium">System Active</span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-accent/10 p-3 flex items-start gap-2 text-xs text-muted-foreground border-b border-accent/10">
          <Info className="w-3.5 h-3.5 mt-0.5 text-accent" />
          <p>Responses are based on the uploaded file and Indian legal framework. Always consult with legal counsel for final decisions.</p>
        </div>

        {/* Messages */}
        <div
          className="flex-1 p-6 overflow-y-auto custom-scrollbar"
          ref={scrollRef}
        >
          <div className="space-y-6">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-accent" : "bg-primary"
                      }`}
                  >
                    {m.role === "user" ? (
                      <User className="h-5 w-5 text-accent-foreground" />
                    ) : (
                      <Bot className="h-5 w-5 text-primary-foreground" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${m.role === "user"
                      ? "bg-accent text-accent-foreground rounded-tr-none"
                      : "bg-card border border-border rounded-tl-none"
                      }`}
                  >
                    {m.role === "user" ? (
                      m.content
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-li:my-1">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="p-4 rounded-2xl bg-card border border-border rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/50 bg-background/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about legal provisions, timelines, or requirements..."
              className="rounded-xl border-border/50 focus-visible:ring-accent"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-accent hover:bg-accent-hover text-accent-foreground rounded-xl px-6"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-[10px] text-center mt-3 text-muted-foreground uppercase tracking-widest font-bold">
            Note - AI can make mistakes. Please verfiy with your Legal Advisor
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
