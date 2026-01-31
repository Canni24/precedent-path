import { Button } from "@/components/ui/button";
import { Scale, Settings, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { signOut } = useAuth()
  const handleLogout = async () => {
    await signOut()
  };
  return (
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
            <h1 className="text-xl font-bold">LegalBhai</h1>
            <p className="text-xs text-muted-foreground">Legal Research Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            title="Back to Home"
          >
            <Home className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { }}
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
  )

}