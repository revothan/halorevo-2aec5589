import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { FreeTrialFormData } from "@/lib/validations/free-trial";
import { motion } from "framer-motion";

interface StepOneProps {
  form: UseFormReturn<FreeTrialFormData>;
}

export const StepOne = ({ form }: StepOneProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...form.register("email")}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...form.register("password")}
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...form.register("confirmPassword")}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>
    </motion.div>
  );
};