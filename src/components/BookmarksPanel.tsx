import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Trash2, Calendar, MapPin, FileText, Download } from "lucide-react";
import { toast } from "sonner";

interface BookmarksPanelProps {
  bookmarks: any[];
  onRemove: (bookmark: any) => void;
  onSelect: (bookmark: any) => void;
}

export const BookmarksPanel = ({ bookmarks, onRemove, onSelect }: BookmarksPanelProps) => {
  const handleExportBookmarks = () => {
    const data = JSON.stringify(bookmarks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.json';
    a.click();
    toast.success("Bookmarks exported successfully");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-y-auto p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Bookmarked Cases</h2>
          <p className="text-muted-foreground">
            {bookmarks.length} {bookmarks.length === 1 ? 'case' : 'cases'} saved for later
          </p>
        </div>
        {bookmarks.length > 0 && (
          <Button onClick={handleExportBookmarks} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <Card className="p-12 text-center">
          <Bookmark className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No bookmarks yet</h3>
          <p className="text-muted-foreground">
            Start bookmarking cases you want to reference later
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {bookmarks.map((bookmark, idx) => (
            <motion.div
              key={bookmark.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-6 hover-tilt cursor-pointer border-2 hover:border-secondary transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1" onClick={() => onSelect(bookmark)}>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">
                      {bookmark.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {bookmark.court}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {bookmark.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {bookmark.citations || 0} citations
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(bookmark);
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {bookmark.tags.map((tag: string, tagIdx: number) => (
                    <Badge key={tagIdx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {bookmark.snippet}
                </p>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Relevance Score
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {bookmark.relevance}%
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-secondary/20 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${bookmark.relevance}%` }}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
