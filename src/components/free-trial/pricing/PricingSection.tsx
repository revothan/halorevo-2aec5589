import { UseFormReturn } from "react-hook-form";
import { FreeTrialFormData } from "@/lib/validations/free-trial";
import { PricingPlan } from "./PricingPlan";

interface PricingSectionProps {
  form: UseFormReturn<FreeTrialFormData>;
}

export const PricingSection = ({ form }: PricingSectionProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;
  const selectedPlan = watch("selectedPlan");

  const basicFeatures = [
    "Custom responsive website design",
    "Up to 5 pages",
    "Basic SEO optimization setup",
    "Mobile-first approach",
    "Monthly maintenance (updates, bug fixes, and backups)",
    "24-hour support response time",
    "Monthly performance report",
    "Cancel anytime, no contracts",
  ];

  const proFeatures = [
    "Up to 30 pages",
    "Weekly maintenance and monitoring",
    "E-commerce functionality setup",
    "Custom animations and interactions",
    "1-hour support response time",
    "Weekly performance analytics",
    "Priority support (email and live chat 24/7)",
    "Automation setup",
    "Priority access to new features",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Choose Your Preferred Plan</h3>
        {errors.selectedPlan && (
          <p className="text-red-500 text-sm">{errors.selectedPlan.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PricingPlan
          title="Basic"
          price={1350}
          description="Perfect for small businesses looking to establish their online presence"
          features={basicFeatures}
          isSelected={selectedPlan === "starter"}
          onClick={() => setValue("selectedPlan", "starter")}
        />

        <PricingPlan
          title="Professional"
          price={2000}
          description="For growing businesses that need a powerful online presence"
          features={proFeatures}
          isSelected={selectedPlan === "professional"}
          onClick={() => setValue("selectedPlan", "professional")}
        />
      </div>
    </div>
  );
};