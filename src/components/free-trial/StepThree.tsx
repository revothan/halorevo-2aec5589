import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FreeTrialFormData } from "@/lib/validations/free-trial";
import { PricingSection } from "./pricing/PricingSection";
import { MeetingScheduler } from "./meeting/MeetingScheduler";

interface StepThreeProps {
  form: UseFormReturn<FreeTrialFormData>;
}

export const StepThree = ({ form }: StepThreeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This is a free consultation. No payment is required now - you'll only
          be charged if you decide to proceed with our services after reviewing
          the website redesign.
        </AlertDescription>
      </Alert>

      <PricingSection form={form} />
      <MeetingScheduler form={form} />
    </motion.div>
  );
};