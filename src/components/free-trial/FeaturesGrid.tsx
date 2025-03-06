
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe, Rocket, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const FeaturesGrid = () => {
  const features = [
    {
      icon: Globe,
      title: "Desain Profesional",
      description: "Dapatkan website modern, responsif yang terlihat bagus di semua perangkat",
    },
    {
      icon: Rocket,
      title: "Dioptimalkan Performa",
      description: "Kecepatan pemuatan super cepat dan pengalaman pengguna optimal",
    },
    {
      icon: Sparkles,
      title: "Fokus Konversi",
      description: "Elemen desain strategis yang mengubah pengunjung menjadi pelanggan",
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
