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

type FieldName = keyof FreeTrialFormData;

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
      selectedPlan: undefined,
      meetingType: undefined,
      meetingDate: undefined,
      meetingTime: undefined,
    },
    mode: "onChange",
  });

  const getStepFields = (stepIndex: number): FieldName[] => {
    switch (stepIndex) {
      case 0:
        return ["email", "password", "confirmPassword"];
      case 1:
        return ["currentWebsite", "currentLikes", "improvements"];
      case 2:
        return ["selectedPlan", "meetingType", "meetingDate", "meetingTime"];
      default:
        return [];
    }
  };

  const validateStep = async (stepIndex: number) => {
    const fields = getStepFields(stepIndex);
    const isFieldsValid = await form.trigger(fields);

    if (!isFieldsValid) return false;

    // Additional validation for step 0 (password matching)
    if (stepIndex === 0) {
      const values = form.getValues();
      if (values.password !== values.confirmPassword) {
        form.setError("confirmPassword", {
          type: "manual",
          message: "Passwords don't match",
        });
        return false;
      }
    }

    return true;
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

      // First create the user account
      const { data: userData, error: signUpError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
          options: {
            data: {
              email: data.email,
              current_website: data.currentWebsite,
            },
          },
        },
      );

      if (signUpError) throw signUpError;

      // Create a full meeting datetime by combining date and time
      const meetingDateTime = new Date(data.meetingDate!);
      const [hours] = data.meetingTime!.split(":");
      meetingDateTime.setHours(parseInt(hours), 0, 0, 0);

      const { error: trialRequestError } = await supabase
        .from("trial_requests")
        .insert([
          {
            user_id: userData.user?.id,
            email: data.email,
            current_website: data.currentWebsite || null,
            current_likes: data.currentLikes || null,
            improvements: data.improvements || null,
            selected_plan: data.selectedPlan,
            meeting_type: data.meetingType,
            meeting_date: meetingDateTime.toISOString(),
            meeting_time: data.meetingTime,
            status: "pending",
          },
        ]);

      if (trialRequestError) {
        console.error("Trial request error:", trialRequestError);
        throw trialRequestError;
      }

      toast({
        title: "Success! 🎉",
        description:
          "Your consultation has been scheduled. Please check your email to verify your account.",
      });

      // After successful submission, redirect to home
      navigate("/");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isStepValid = await validateStep(step);
      if (!isStepValid) {
        return;
      }

      const data = form.getValues();
      console.log("Current step:", step);
      console.log("Form data:", data);

      if (step === steps.length - 1) {
        // Validate entire form before final submission
        const isValid = await form.trigger();
        if (!isValid) {
          return;
        }
        await handleFinalSubmit(data);
      } else {
        handleNextStep();
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
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
                        ? "Schedule Consultation"
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