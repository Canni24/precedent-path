import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, FileText, Clock, Search, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalyticsDashboardProps {
  totalCases: number;
  searchHistory: Array<{ query: string; timestamp: Date }>;
  bookmarks: any[];
}

export const AnalyticsDashboard = ({ totalCases, searchHistory, bookmarks }: AnalyticsDashboardProps) => {
  const stats = [
    {
      label: "Total Cases",
      value: totalCases.toString(),
      icon: FileText,
      trend: "+12%",
      color: "text-blue-500",
    },
    {
      label: "Searches Today",
      value: searchHistory.length.toString(),
      icon: Search,
      trend: "+8%",
      color: "text-green-500",
    },
    {
      label: "Bookmarked",
      value: bookmarks.length.toString(),
      icon: Target,
      trend: "+5%",
      color: "text-purple-500",
    },
    {
      label: "Avg Response Time",
      value: "1.2s",
      icon: Clock,
      trend: "-15%",
      color: "text-orange-500",
    },
  ];

  const topSearches = [
    { term: "Contract Law", count: 45 },
    { term: "Constitutional Rights", count: 38 },
    { term: "Property Disputes", count: 32 },
    { term: "Criminal Procedure", count: 28 },
    { term: "Labour Law", count: 24 },
  ];

  const jurisdictionData = [
    { name: "India", cases: 38, percentage: 76 },
    { name: "UK", cases: 12, percentage: 24 },
  ];

  const courtLevelData = [
    { name: "Supreme Court", cases: 35, percentage: 70 },
    { name: "Appellate", cases: 12, percentage: 24 },
    { name: "Others", cases: 3, percentage: 6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-y-auto p-6 space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold mb-2">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Comprehensive insights into your legal research</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6 hover-tilt">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Searches */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Top Search Terms</h3>
          </div>
          <div className="space-y-4">
            {topSearches.map((search, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{search.term}</span>
                  <span className="text-muted-foreground">{search.count} searches</span>
                </div>
                <div className="w-full bg-secondary/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(search.count / 45) * 100}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="bg-primary h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Jurisdiction Distribution */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold">Jurisdiction Distribution</h3>
          </div>
          <div className="space-y-4">
            {jurisdictionData.map((jurisdiction, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{jurisdiction.name}</span>
                  <span className="text-muted-foreground">{jurisdiction.cases} cases ({jurisdiction.percentage}%)</span>
                </div>
                <div className="w-full bg-secondary/20 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${jurisdiction.percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    className="bg-secondary h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Court Level Distribution */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Court Level Distribution</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courtLevelData.map((court, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-secondary/20"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-primary"
                    initial={{ strokeDasharray: "0 377" }}
                    animate={{ strokeDasharray: `${(court.percentage / 100) * 377} 377` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{court.percentage}%</span>
                </div>
              </div>
              <p className="font-medium">{court.name}</p>
              <p className="text-sm text-muted-foreground">{court.cases} cases</p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">Recent Research Activity</h3>
        </div>
        <div className="space-y-3">
          {searchHistory.slice(0, 5).map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{item.query}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {item.timestamp.toLocaleTimeString()}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
