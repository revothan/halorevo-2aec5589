import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PricingPlanProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  isSelected: boolean;
  onClick: () => void;
}

export const PricingPlan = ({
  title,
  price,
  description,
  features,
  isSelected,
  onClick,
}: PricingPlanProps) => {
  return (
    <Card
      className={cn(
        "p-6 cursor-pointer border-2 transition-all hover:border-rich-purple/50",
        isSelected
          ? "border-rich-purple ring-2 ring-rich-purple ring-offset-2"
          : "border-muted"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-xl">{title}</h4>
          <p className="text-2xl font-bold mt-2">
            ${price}<span className="text-sm font-normal">/month</span>
          </p>
        </div>
        {isSelected && <Check className="text-rich-purple h-6 w-6" />}
      </div>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
      <div className="mt-6">
        <p className="font-medium mb-3">What's included:</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};