import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FreeTrialFormData } from "@/lib/validations/free-trial";
import { motion } from "framer-motion";
import { Building2, Sparkles } from "lucide-react";

interface StepThreeProps {
  form: UseFormReturn<FreeTrialFormData>;
}

export const StepThree = ({ form }: StepThreeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="businessName">Business Name</Label>
        <div className="flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-rich-purple" />
          <Input
            id="businessName"
            {...form.register("businessName")}
          />
        </div>
        {form.formState.errors.businessName && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.businessName.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          placeholder="e.g., E-commerce, Healthcare, Technology"
          {...form.register("industry")}
        />
        {form.formState.errors.industry && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.industry.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="goals">Business Goals</Label>
        <div className="flex items-start space-x-2">
          <Sparkles className="w-5 h-5 text-rich-purple mt-2" />
          <Textarea
            id="goals"
            placeholder="What are your main business objectives?"
            className="h-24"
            {...form.register("goals")}
          />
        </div>
      </div>
    </motion.div>
  );
};