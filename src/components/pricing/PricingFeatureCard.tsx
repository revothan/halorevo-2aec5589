import React from "react";
import { Check } from "lucide-react";

interface Feature {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  onToggle: (featureId: string) => void;
}

const FeatureCard = React.memo(({ feature, isSelected, onToggle }: FeatureCardProps) => (
  <div
    onClick={() => onToggle(feature.id)}
    className={`
      p-4 rounded-lg cursor-pointer transition-colors
      ${
        isSelected
          ? "bg-rich-blue/20 border-2 border-rich-blue"
          : "bg-rich-gray/20 border border-white/10 hover:bg-rich-gray/30"
      }
    `}
  >
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-bold">{feature.name}</h4>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isSelected ? "bg-rich-blue" : "bg-rich-gray/40"
        }`}
      >
        <Check className="w-4 h-4" />
      </div>
    </div>
    <p className="text-sm text-gray-400">{feature.description}</p>
    <div className="text-sm text-rich-gold mt-2">
      +${feature.basePrice}/month
    </div>
  </div>
));

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;