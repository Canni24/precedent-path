import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Moon, Sun, Languages, Zap, Database } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
          <DialogDescription>
            Customize your JuriSynch experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Appearance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Appearance</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes
                </p>
              </div>
              <Switch id="dark-mode" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="motion">Reduce Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations for better performance
                </p>
              </div>
              <Switch id="motion" />
            </div>
          </div>

          <Separator />

          {/* Language & Locale */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Languages className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-semibold">Language & Locale</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Display Language</Label>
              <Select defaultValue="en-IN">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-IN">English (India)</SelectItem>
                  <SelectItem value="hi-IN">हिन्दी (Hindi)</SelectItem>
                  <SelectItem value="en-US">English (US)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-format">Date Format</Label>
              <Select defaultValue="dd-mmm-yyyy">
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mmm-yyyy">DD MMM YYYY (15 Jan 2024)</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY (01/15/2024)</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD (2024-01-15)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Performance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">Performance</h3>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="webgl">Enable WebGL Effects</Label>
                <p className="text-sm text-muted-foreground">
                  3D visualizations and animations
                </p>
              </div>
              <Switch id="webgl" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="lazy-load">Lazy Load Documents</Label>
                <p className="text-sm text-muted-foreground">
                  Load documents on demand
                </p>
              </div>
              <Switch id="lazy-load" defaultChecked />
            </div>
          </div>

          <Separator />

          {/* Data & Privacy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo" />
              <h3 className="text-lg font-semibold">Data & Privacy</h3>
            </div>

            <div className="space-y-2">
              <Label htmlFor="retention">Data Retention</Label>
              <Select defaultValue="30">
                <SelectTrigger id="retention">
                  <SelectValue placeholder="Select retention period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Search history and uploaded documents
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};