import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Building2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type BillingCycle = "monthly" | "yearly";

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  creditsPerCase: number;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for individual lawyers and small cases",
    monthlyPrice: 1999,
    yearlyPrice: 19999,
    creditsPerCase: 10,
    features: [
      "10 case credits per month",
      "Basic AI analysis",
      "Email support",
      "Standard response time",
      "Export to PDF",
    ],
    icon: <Zap className="w-6 h-6" />,
    buttonText: "Get Started",
  },
  {
    name: "Professional",
    description: "For growing law firms and frequent users",
    monthlyPrice: 4999,
    yearlyPrice: 49999,
    creditsPerCase: 50,
    features: [
      "50 case credits per month",
      "Advanced AI analysis",
      "Priority email support",
      "Fast response time",
      "Export to PDF & Word",
      "Case history & archives",
      "Team collaboration (3 users)",
    ],
    icon: <Crown className="w-6 h-6" />,
    popular: true,
    buttonText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    description: "For large firms and organizations",
    monthlyPrice: 14999,
    yearlyPrice: 149999,
    creditsPerCase: 200,
    features: [
      "200 case credits per month",
      "Premium AI analysis with citations",
      "24/7 dedicated support",
      "Instant response time",
      "All export formats",
      "Unlimited archives",
      "Unlimited team members",
      "Custom integrations",
      "SLA guarantee",
    ],
    icon: <Building2 className="w-6 h-6" />,
    buttonText: "Contact Sales",
  },
];

export const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary">
            Pricing Plans
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-primary">Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flexible pricing designed for legal professionals. Pay per case or subscribe for unlimited access.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <Badge className="bg-accent text-accent-foreground text-xs">Save 17%</Badge>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card
                className={`h-full flex flex-col transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? "border-primary/50 shadow-lg shadow-primary/10 scale-105"
                    : "border-border/50 hover:border-primary/30"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                      plan.popular
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold text-foreground">
                        {formatPrice(billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice)}
                      </span>
                      <span className="text-muted-foreground">
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      <span className="font-semibold text-primary">{plan.creditsPerCase}</span> case credits per month
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    className={`w-full rounded-full ${
                      plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                    onClick={() => navigate("/auth")}
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          All plans include a 14-day free trial. No credit card required to start.
        </motion.p>
      </div>
    </section>
  );
};
