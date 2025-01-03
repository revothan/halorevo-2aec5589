import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
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
import {
  freeTrialSchema,
  type FreeTrialFormData,
} from "@/lib/validations/free-trial";

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
    mode: "onChange",
  });

  const getStepFields = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return ["email", "password", "confirmPassword"];
      case 1:
        return ["currentWebsite", "currentLikes", "improvements"];
      case 2:
        return ["businessName", "industry", "goals"];
      default:
        return [];
    }
  };

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleFinalSubmit = async (data: FreeTrialFormData) => {
    try {
      setIsLoading(true);
      console.log("Starting final submit with data:", data);

      const { data: userData, error: signUpError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
          options: {
            data: {
              business_name: data.businessName,
              industry: data.industry,
              current_website: data.currentWebsite,
            },
          },
        },
      );

      if (signUpError) throw signUpError;

      const { error: trialRequestError } = await supabase
        .from("trial_requests")
        .insert([
          {
            user_id: userData.user?.id,
            email: data.email,
            business_name: data.businessName,
            industry: data.industry,
            current_website: data.currentWebsite,
            current_likes: data.currentLikes,
            improvements: data.improvements,
            goals: data.goals,
            status: "pending",
          },
        ]);

      if (trialRequestError) throw trialRequestError;

      toast({
        title: "Success! 🎉",
        description:
          "Your account has been created. Please check your email to verify your account.",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentStepFields = getStepFields(step);
    const isStepValid = await form.trigger(currentStepFields);

    if (!isStepValid) {
      return;
    }

    const data = form.getValues();
    console.log("Current step:", step);
    console.log("Form data:", data);

    if (step === steps.length - 1) {
      await handleFinalSubmit(data);
    } else {
      handleNextStep();
    }
  };

  return (
    <>
      <FormProgress steps={steps} currentStep={step} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <Card className="glass-card border-rich-purple/20">
            <CardHeader>
              <CardTitle>{steps[step].title}</CardTitle>
              <CardDescription>{steps[step].description}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 0 && <StepOne form={form} />}
                {step === 1 && <StepTwo form={form} />}
                {step === 2 && <StepThree form={form} />}

                <div className="flex gap-4">
                  {step > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                      className="flex-1"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className={`flex-1 bg-rich-purple hover:bg-rich-purple/90 ${
                      step === 0 ? "w-full" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing..."
                      : step === steps.length - 1
                        ? "Submit Application"
                        : "Next Step"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
