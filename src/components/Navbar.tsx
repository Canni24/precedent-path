import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Scale, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Features", sectionId: "features" },
    { label: "How It Works", sectionId: "how-it-works" },
    { label: "Use Cases", sectionId: "use-cases" },
    { label: "Tech Stack", sectionId: "tech-stack" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "w-[95%] max-w-6xl" : "w-[90%] max-w-5xl"
        }`}
      >
      <div
        className={`glass-card rounded-full px-6 py-3 transition-all duration-300 ${
          isScrolled
            ? "backdrop-blur-xl bg-background/80 shadow-lg border-border/50"
            : "backdrop-blur-md bg-background/60 border-border/30"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-full">
              <Scale className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              LegalAI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.sectionId}
                variant="ghost"
                className="text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-full"
                onClick={() => scrollToSection(link.sectionId)}
              >
                {link.label}
              </Button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="ghost"
              className="rounded-full hover:bg-accent/50"
              onClick={() => navigate("/auth")}
            >
              Sign In
            </Button>
            <Button
              className="rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              onClick={() => navigate("/auth")}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-4 mt-4 border-t border-border/30">
                {navLinks.map((link) => (
                  <Button
                    key={link.sectionId}
                    variant="ghost"
                    className="w-full justify-start rounded-full hover:bg-accent/50"
                    onClick={() => scrollToSection(link.sectionId)}
                  >
                    {link.label}
                  </Button>
                ))}
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border/30">
                  <Button
                    variant="ghost"
                    className="w-full rounded-full hover:bg-accent/50"
                    onClick={() => navigate("/auth")}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    onClick={() => navigate("/auth")}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </motion.nav>
  );
};
