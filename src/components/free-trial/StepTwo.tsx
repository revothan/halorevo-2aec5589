import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FreeTrialFormData } from "@/lib/validations/free-trial";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

interface StepTwoProps {
  form: UseFormReturn<FreeTrialFormData>;
}

export const StepTwo = ({ form }: StepTwoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="currentWebsite">Current Website URL</Label>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-rich-purple" />
          <Input
            id="currentWebsite"
            type="url"
            placeholder="https://your-website.com"
            {...form.register("currentWebsite")}
          />
        </div>
        {form.formState.errors.currentWebsite && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.currentWebsite.message}
          </p>
        )}
      </div>
      <div>
        <Label>What do you like about your current website?</Label>
        <Textarea
          placeholder="Share your thoughts..."
          className="h-24"
          {...form.register("currentLikes")}
        />
      </div>
      <div>
        <Label>What would you like to improve?</Label>
        <Textarea
          placeholder="Tell us your pain points..."
          className="h-24"
          {...form.register("improvements")}
        />
      </div>
    </motion.div>
  );
};