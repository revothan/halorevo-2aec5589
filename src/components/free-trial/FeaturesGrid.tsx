import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: Globe,
      title: "Professional Design",
      description: "Get a modern, responsive website that looks great on all devices",
    },
    {
      icon: Rocket,
      title: "Performance Optimized",
      description: "Lightning-fast loading speeds and optimal user experience",
    },
    {
      icon: Sparkles,
      title: "Conversion Focused",
      description: "Strategic design elements that turn visitors into customers",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid md:grid-cols-3 gap-6 mt-16"
    >
      {features.map((feature, i) => (
        <Card key={i} className="glass-card border-rich-purple/20">
          <CardHeader>
            <feature.icon className="w-12 h-12 text-rich-purple mb-4" />
            <CardTitle className="text-xl">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </motion.div>
  );
};