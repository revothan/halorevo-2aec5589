import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Globe, Building2, Sparkles, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { StepOne } from "@/components/free-trial/StepOne";
import { StepTwo } from "@/components/free-trial/StepTwo";
import { StepThree } from "@/components/free-trial/StepThree";
import { FormProgress } from "@/components/free-trial/FormProgress";
import { FormHeader } from "@/components/free-trial/FormHeader";
import {
  freeTrialSchema,
  type FreeTrialFormData,
} from "@/lib/validations/free-trial";
import { motion } from "framer-motion";

const steps = [
  {
    id: "signup",
    title: "Create Your Account",
    description: "Start your journey to a better website",
  },
  {
    id: "website",
    title: "Current Website Details",
    description: "Tell us about your existing website",
  },
  {
    id: "business",
    title: "Business Information",
    description: "Help us understand your business better",
  },
];

const FreeTrial = () => {
  const [step, setStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
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
        // Validate current step fields
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

        const result = await form.trigger(fieldsToValidate);
        if (result) {
          setStep(step + 1);
        }
        return;
      }

      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
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

      if (error) throw error;

      toast({
        title: "Success! 🎉",
        description:
          "We'll be in touch soon to start your website redesign journey!",
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
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray relative p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="container mx-auto max-w-6xl relative">
        <FormHeader />
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
                  {isLoading ? (
                    "Processing..."
                  ) : step === steps.length - 1 ? (
                    "Submit Application"
                  ) : (
                    "Next Step"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mt-16"
        >
          {[
            {
              icon: Globe,
              title: "Professional Design",
              description: "Get a modern, responsive website that looks great on all devices",
            },
            {
              icon: Rocket,
              title: "Performance Optimized",
              description: "Lightning-fast loading speeds and optimal user experience",
            },
            {
              icon: Sparkles,
              title: "Conversion Focused",
              description: "Strategic design elements that turn visitors into customers",
            },
          ].map((feature, i) => (
            <Card key={i} className="glass-card border-rich-purple/20">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-rich-purple mb-4" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FreeTrial;
