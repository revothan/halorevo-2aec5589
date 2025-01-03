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
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="currentWebsite" className="flex items-center gap-1">
          Current Website URL
          <span className="text-sm text-muted-foreground">(optional)</span>
        </Label>
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-rich-purple/60" />
          <Input
            id="currentWebsite"
            type="url"
            placeholder="https://your-website.com"
            {...register("currentWebsite", {
              setValueAs: (value: string) => value.trim() || undefined,
            })}
          />
        </div>
        {errors.currentWebsite && (
          <p className="text-red-500 text-sm mt-1">
            {errors.currentWebsite.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="currentLikes" className="flex items-center gap-1">
          What do you like about your current website?
          <span className="text-sm text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="currentLikes"
          placeholder="Share your thoughts..."
          className="h-24"
          {...register("currentLikes", {
            setValueAs: (value: string) => value.trim() || undefined,
          })}
        />
      </div>

      <div>
        <Label htmlFor="improvements" className="flex items-center gap-1">
          What would you like to improve?
          <span className="text-sm text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="improvements"
          placeholder="Tell us your pain points..."
          className="h-24"
          {...register("improvements", {
            setValueAs: (value: string) => value.trim() || undefined,
          })}
        />
      </div>
    </motion.div>
  );
};

