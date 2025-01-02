import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { FormProgress } from "./FormProgress";
import { freeTrialSchema, type FreeTrialFormData } from "@/lib/validations/free-trial";

interface FreeTrialFormProps {
  steps: {
    id: string;
    title: string;
    description: string;
  }[];
}

export const FreeTrialForm = ({ steps }: FreeTrialFormProps) => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FreeTrialFormData>({
    resolver: zodResolver(freeTrialSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      currentWebsite: "",
      currentLikes: "",
      improvements: "",
      businessName: "",
      industry: "",
      goals: "",
    },
  });

  const onSubmit = async (data: FreeTrialFormData) => {
    try {
      if (step < steps.length - 1) {
        let fieldsToValidate: (keyof FreeTrialFormData)[] = [];
        
        switch (step) {
          case 0:
            fieldsToValidate = ["email", "password", "confirmPassword"];
            break;
          case 1:
            fieldsToValidate = ["currentWebsite"];
            break;
          case 2:
            fieldsToValidate = ["businessName", "industry"];
            break;
        }

        const isValid = await form.trigger(fieldsToValidate);
        
        if (isValid) {
          setStep((prev) => prev + 1);
          return;
        }
        return;
      }

      setIsLoading(true);

      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            business_name: data.businessName,
            industry: data.industry,
            current_website: data.currentWebsite,
          },
        },
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Success! 🎉",
        description: "Your account has been created. Please check your email to verify your account.",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProgress steps={steps} currentStep={step} />
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="max-w-xl mx-auto"
      >
        <Card className="glass-card border-rich-purple/20">
          <CardHeader>
            <CardTitle>{steps[step].title}</CardTitle>
            <CardDescription>{steps[step].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 0 && <StepOne form={form} />}
              {step === 1 && <StepTwo form={form} />}
              {step === 2 && <StepThree form={form} />}

              <Button
                type="submit"
                className="w-full bg-rich-purple hover:bg-rich-purple/90"
                disabled={isLoading}
              >
                {isLoading
                  ? "Processing..."
                  : step === steps.length - 1
                  ? "Submit Application"
                  : "Next Step"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};