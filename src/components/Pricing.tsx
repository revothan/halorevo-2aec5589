import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PricingFeatureCard from "./pricing/PricingFeatureCard";
import PricingVisitsSlider from "./pricing/PricingVisitsSlider";

interface Feature {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

const Pricing = () => {
  const [monthlyVisits, setMonthlyVisits] = useState(1000);
  const [tempVisits, setTempVisits] = useState(1000);
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());

  const features: Feature[] = useMemo(
    () => [
      {
        id: "ecommerce",
        name: "E-commerce",
        basePrice: 200,
        description: "Full shopping cart and payment processing",
      },
      {
        id: "blog",
        name: "Blog System",
        basePrice: 30,
        description: "Content management and commenting",
      },
      {
        id: "automation",
        name: "Automation",
        basePrice: 100,
        description: "Workflow and task automation",
      },
      {
        id: "ai",
        name: "AI Integration",
        basePrice: 300,
        description: "Smart features and AI-powered tools",
      },
      {
        id: "customer_service",
        name: "Customer Service",
        basePrice: 100,
        description: "Chat support and ticket system",
      },
      {
        id: "booking",
        name: "Booking System",
        basePrice: 180,
        description: "Appointment and reservation management",
      },
      {
        id: "analytics",
        name: "Advanced Analytics",
        basePrice: 120,
        description: "Detailed visitor insights and reporting",
      },
    ],
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => setMonthlyVisits(tempVisits), 300);
    return () => clearTimeout(timeout);
  }, [tempVisits]);

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) => {
      const newFeatures = new Set(prev);
      if (newFeatures.has(featureId)) {
        newFeatures.delete(featureId);
      } else {
        newFeatures.add(featureId);
      }
      return newFeatures;
    });
  };

  const calculatePrice = useMemo(() => {
    const visitPrice = Math.floor(monthlyVisits / 1000) * 50;
    const featurePrice = Array.from(selectedFeatures).reduce((total: number, featureId: string) => {
      const feature = features.find((f) => f.id === featureId);
      return total + (feature?.basePrice || 0);
    }, 0);

    return visitPrice + featurePrice;
  }, [monthlyVisits, selectedFeatures, features]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-rich-blue/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-rich-gold/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Build Your <span className="text-rich-gold">Custom Solution</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Tailor your website package based on your expected traffic and
            needed features. Scale up or down anytime as your business grows.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-rich-gray/30 border border-white/10 rounded-xl backdrop-blur-sm p-8">
          <div className="mb-12">
            <PricingVisitsSlider value={tempVisits} onChange={setTempVisits} />

            <h3 className="text-xl font-bold mb-4">Choose Your Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <PricingFeatureCard
                  key={feature.id}
                  feature={feature}
                  isSelected={selectedFeatures.has(feature.id)}
                  onToggle={toggleFeature}
                />
              ))}
            </div>
          </div>

          <div className="text-center p-6 bg-rich-gray/40 rounded-lg">
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">
                Estimated Monthly Price
              </div>
              <div className="text-4xl font-bold text-white">
                ${calculatePrice}
                <span className="text-lg text-gray-400">/month</span>
              </div>
              <div className="text-sm text-gray-400 mt-2">
                One-time setup fee: $500
              </div>
            </div>

            <Button
              className="w-full md:w-auto py-6 px-8 rounded-lg font-medium inline-flex items-center justify-center gap-2
                bg-gradient-to-r from-rich-gold to-amber-500 text-rich-black hover:brightness-110"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            14-day money-back guarantee • No long-term contracts • Cancel
            anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;