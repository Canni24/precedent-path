import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { renderCanvas } from "@/components/ui/canvas";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, UserCircle2, Gavel, Users } from "lucide-react";
import { toast } from "sonner";

const roles = [
  { id: "judge", name: "Judge", icon: Gavel, color: "text-primary" },
  { id: "counsel", name: "Counsel", icon: Scale, color: "text-secondary" },
  { id: "clerk", name: "Clerk", icon: Users, color: "text-accent" },
];

export default function Auth() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    renderCanvas();
  }, []);

  const handleLogin = () => {
    if (!selectedRole) {
      toast.error("Please select your role");
      return;
    }
    if (!email || !password) {
      toast.error("Please enter your credentials");
      return;
    }
    toast.success("Login successful");
    navigate("/dashboard");
  };

  const handleDemo = () => {
    toast.success("Entering demo mode");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6 relative">
      {/* Canvas Background */}
      <canvas
        className="pointer-events-none absolute inset-0 z-0"
        id="canvas"
      />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="p-8 glass-card">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">JuriSynch</h1>
            <p className="text-muted-foreground">Sign in to continue</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <Label className="mb-3 block">Select Your Role</Label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((role) => (
                <motion.button
                  key={role.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedRole === role.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <role.icon className={`w-8 h-8 mx-auto mb-2 ${role.color}`} />
                  <div className="text-xs font-medium">{role.name}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@court.gov.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary-hover"
              size="lg"
            >
              Sign In
            </Button>
            <Button
              onClick={handleDemo}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Try Demo
            </Button>
          </div>

          {/* Footer */}
          <p className="text-xs text-center text-muted-foreground mt-6">
            Secure authentication powered by JuriSynch
          </p>
        </Card>
      </motion.div>
    </div>
  );
}