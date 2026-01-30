
import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronRight,
  MessageSquare,
  Download,
  Scale,
  ShieldAlert,
  Gavel,
  Clock,
  UserCheck,
  BookOpen,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PoshAnalysisResult } from "@/lib/ai-service.lib";

interface ResultDisplayProps {
  data: PoshAnalysisResult;
  onStartChat: () => void;
}

export default function ResultDisplay({ data, onStartChat }: ResultDisplayProps) {
  const isAllowed = data.verdict === "POSH ALLOWED";

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-8 pb-12">
      {/* Top Banner / Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        <Card className="lg:col-span-3 overflow-hidden border-none shadow-2xl bg-card/80 backdrop-blur-sm relative">
          <div className={`h-2 w-full absolute top-0 ${isAllowed ? 'bg-green-500' : 'bg-destructive'}`} />
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isAllowed ? 'bg-green-500/10 text-green-600' : 'bg-destructive/10 text-destructive'}`}>
                  {isAllowed ? <Scale className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
                </div>
                <div>
                  <CardTitle className="text-3xl font-black tracking-tight">Judicial Review</CardTitle>
                  <p className="text-muted-foreground font-medium">{data.jurisdictionalSummary.authority}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={isAllowed ? "default" : "destructive"} className="px-6 py-2 text-base font-bold rounded-full">
                {data.verdict}
              </Badge>
              <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Sector: {data.jurisdictionalSummary.sector}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 mb-6">
              <p className="text-xl leading-relaxed font-medium text-foreground/90">
                {data.summary}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl bg-primary text-primary-foreground flex flex-col justify-center p-8 text-center space-y-4">
          <div className="text-xs opacity-70 uppercase tracking-widest font-black">Liability Risk Score</div>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-white/10"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * data.riskAssessment.liabilityScore) / 10}
                className="text-accent transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-5xl font-black">{data.riskAssessment.liabilityScore}</span>
          </div>
          <div className="text-sm font-medium opacity-80 px-4">
            {data.riskAssessment.liabilityReason}
          </div>
        </Card>
      </motion.div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column: Statutory Benchmarks & Nuances */}
        <div className="lg:col-span-2 space-y-8">

          {/* Statutory Benchmarks */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <ShieldAlert className="w-5 h-5 text-accent" />
              Statutory Benchmarks (Compliance)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card/40 border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    <UserCheck className="w-4 h-4 text-accent" />
                    IC Constitution
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  {data.statutoryBenchmark.icConstitution}
                </CardContent>
              </Card>
              <Card className="bg-card/40 border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-accent" />
                    Limitation Period
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  {data.statutoryBenchmark.limitationPeriod}
                </CardContent>
              </Card>
              <Card className="bg-card/40 border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    <Gavel className="w-4 h-4 text-accent" />
                    Inquiry Timeline
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed">
                  {data.statutoryBenchmark.inquiryTimeline}
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Legal Nuance Tracker */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <BookOpen className="w-5 h-5 text-accent" />
              Legal Nuance Tracker
            </h3>
            <Card className="bg-accent/5 border-none shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-accent/10">
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <Badge variant="outline" className="border-accent/30 text-accent">Section 2(m)</Badge>
                    Gender Neutrality
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.legalNuance.genderNeutrality}
                  </p>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-primary">
                    <Badge variant="outline" className="border-accent/30 text-accent">Section 14</Badge>
                    Malicious Intent
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {data.legalNuance.maliciousIntent}
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Citations Section */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <FileText className="w-5 h-5 text-accent" />
              AI-Generated Citations
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.citations.map((cite, i) => (
                <div
                  key={i}
                  className="px-4 py-2 bg-card border border-border shadow-sm rounded-lg text-xs font-semibold text-muted-foreground flex items-center gap-2 hover:border-accent hover:text-primary transition-all cursor-default"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  {cite}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Risk & Implications */}
        <div className="space-y-8">
          {/* Strategic Implications */}
          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <ShieldAlert className="w-5 h-5 text-accent" />
              Strategic Implications
            </h3>
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="p-6 bg-green-50/50 dark:bg-green-950/20 border-b border-green-100 dark:border-green-900/30">
                <h4 className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold mb-3 uppercase tracking-wider text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  Positive Procedural Upholds
                </h4>
                <ul className="space-y-3">
                  {data.strategicImplications.pros.map((pro, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-destructive/5 border-t border-destructive/10">
                <h4 className="flex items-center gap-2 text-destructive font-bold mb-3 uppercase tracking-wider text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  Identified Procedural Gaps
                </h4>
                <ul className="space-y-3">
                  {data.strategicImplications.cons.map((con, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
                      <ChevronRight className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </section>

          {/* Confidentiality Alert */}
          <section className="space-y-4">
            <Card className="bg-card border-none shadow-lg overflow-hidden relative group">
              <div className="absolute inset-y-0 left-0 w-1.5 bg-accent group-hover:w-2 transition-all" />
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-accent flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Confidentiality risk
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm font-medium leading-relaxed">
                {data.riskAssessment.confidentialityRisk}
              </CardContent>
            </Card>
          </section>

          {/* Prompt Information */}
          <div className="p-4 bg-accent/5 rounded-xl border border-accent/10 flex items-start gap-3">
            <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              This analysis is generated using the <span className="text-primary font-bold">POSH Act Expert Model</span>. It analyzes jurisdictional maintainability, statutory compliance, and specific legal nuances like gender neutrality as established in the provided documentation.
            </p>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-card rounded-3xl border-2 border-accent/10 shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex gap-3 relative z-10">
          <Button variant="outline" size="lg" className="rounded-xl px-8 h-14 font-bold border-accent/20 hover:bg-accent/5 transition-all">
            <Download className="w-5 h-5 mr-3" />
            Export Legal Report
          </Button>
        </div>

        <Button
          onClick={onStartChat}
          size="lg"
          className="bg-accent hover:bg-accent-hover text-accent-foreground font-black px-12 h-14 text-xl rounded-xl shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto relative z-10"
        >
          <MessageSquare className="w-6 h-6 mr-3" />
          Clarify with AI
        </Button>
      </motion.div>
    </div>
  );
}
