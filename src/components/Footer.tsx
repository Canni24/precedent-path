import { motion } from "framer-motion";
import { Scale, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates about JuriSynch.",
      });
      setEmail("");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = {
    product: [
      { label: "Features", action: () => scrollToSection("features") },
      { label: "How It Works", action: () => scrollToSection("how-it-works") },
      { label: "Use Cases", action: () => scrollToSection("use-cases") },
      { label: "Technology", action: () => scrollToSection("tech-stack") },
    ],
    company: [
      { label: "About Us", action: () => navigate("/about") },
      { label: "Careers", action: () => navigate("/careers") },
      { label: "Contact", action: () => navigate("/contact") },
      { label: "Blog", action: () => navigate("/blog") },
    ],
    legal: [
      { label: "Privacy Policy", action: () => navigate("/privacy") },
      { label: "Terms of Service", action: () => navigate("/terms") },
      { label: "Cookie Policy", action: () => navigate("/cookies") },
      { label: "Compliance", action: () => navigate("/compliance") },
    ],
    resources: [
      { label: "Documentation", action: () => navigate("/docs") },
      { label: "API Reference", action: () => navigate("/api") },
      { label: "Support Center", action: () => navigate("/support") },
      { label: "Status", action: () => navigate("/status") },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, label: "LinkedIn", url: "#" },
    { icon: Twitter, label: "Twitter", url: "#" },
    { icon: Facebook, label: "Facebook", url: "#" },
    { icon: Instagram, label: "Instagram", url: "#" },
  ];

  const contactInfo = [
    { icon: Mail, text: "contact@jurisynch.com" },
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: MapPin, text: "123 Legal Street, Law City, LC 12345" },
  ];

  return (
    <footer className="relative py-16 px-6 border-t border-border/50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <Scale className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">JuriSynch</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Empowering legal professionals with AI-driven case law research and intelligent document analysis.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 border border-border/50"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Get the latest updates on legal tech innovations and JuriSynch features.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="gap-2">
                <Send className="h-4 w-4" />
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-8 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} JuriSynch. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Made with ❤️ for Legal Professionals</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
