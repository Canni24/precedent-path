import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Upload, Clock, Bookmark, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SearchPanelProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  jurisdiction?: string;
  courtLevel?: string;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
}

export const SearchPanel = ({ onSearch }: SearchPanelProps) => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({});
  const [showAdvanced, setShowAdvanced] = useState(false);

  const recentSearches = [
    "Contractual breach remedies",
    "Property dispute precedents",
    "Consumer protection cases",
  ];

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, filters);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex flex-col bg-card border-r border-border"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold mb-1">Search & Upload</h2>
        <p className="text-sm text-muted-foreground">Find precedents or upload case files</p>
      </div>

      {/* Upload Area */}
      <div className="p-6 border-b border-border">
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-secondary transition-colors cursor-pointer group">
          <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground group-hover:text-secondary transition-colors" />
          <p className="text-sm font-medium mb-1">Drop files here</p>
          <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 50MB</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          <Label htmlFor="search">Search Query</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search cases, precedents, statutes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground">Press / to focus • Enter to search</p>
        </div>

        {/* Advanced Filters Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </span>
          <Badge variant="secondary" className="ml-2">
            {Object.values(filters).filter(Boolean).length}
          </Badge>
        </Button>

        {/* Advanced Filters */}
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4"
          >
            <div className="space-y-2">
              <Label htmlFor="jurisdiction">Jurisdiction</Label>
              <Select onValueChange={(value) => setFilters({ ...filters, jurisdiction: value })}>
                <SelectTrigger id="jurisdiction">
                  <SelectValue placeholder="All jurisdictions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supreme">Supreme Court</SelectItem>
                  <SelectItem value="high">High Courts</SelectItem>
                  <SelectItem value="district">District Courts</SelectItem>
                  <SelectItem value="tribunal">Tribunals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="courtLevel">Court Level</Label>
              <Select onValueChange={(value) => setFilters({ ...filters, courtLevel: value })}>
                <SelectTrigger id="courtLevel">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apex">Apex</SelectItem>
                  <SelectItem value="appellate">Appellate</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">From Date</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">To Date</Label>
                <Input
                  id="dateTo"
                  type="date"
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground"
          size="lg"
        >
          <Search className="w-4 h-4 mr-2" />
          Search Cases
        </Button>

        {/* Recent Searches */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Recent Searches</Label>
          </div>
          <div className="space-y-2">
            {recentSearches.map((search, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(search)}
                className="w-full text-left text-sm p-2 rounded-lg hover:bg-muted transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* Saved Searches */}
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Bookmark className="w-4 h-4 text-muted-foreground" />
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Saved Searches</Label>
          </div>
          <p className="text-xs text-muted-foreground">No saved searches yet</p>
        </div>
      </div>
    </motion.div>
  );
};