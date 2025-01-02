import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Rocket, ArrowRight, Globe, Building2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { StepOne } from "@/components/free-trial/StepOne";
import { StepTwo } from "@/components/free-trial/StepTwo";
import { StepThree } from "@/components/free-trial/StepThree";
import { freeTrialSchema, type FreeTrialFormData } from "@/lib/validations/free-trial";

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
        const result = await form.trigger(Object.keys(form.getValues()) as Array<keyof FreeTrialFormData>);
        if (result) {
          setStep(step + 1);
        }
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Success! 🎉",
        description: "We'll be in touch soon to start your website redesign journey!",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  // ... keep existing code (JSX for the form layout, including the header and features grid)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray relative p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 pt-8"
        >
          <div className="inline-flex items-center gap-2 bg-rich-purple/10 px-4 py-2 rounded-full mb-4">
            <Rocket className="w-4 h-4 text-rich-purple" />
            <span className="text-sm font-mono text-rich-purple">
              Limited Time Offer: Free Website Redesign
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Transform Your <span className="text-gradient">Digital Presence</span>
          </h1>
          <p className="text-xl text-rich-gold/80 max-w-2xl mx-auto">
            Get a professional website redesign that converts visitors into customers.
            Start your journey today!
          </p>
        </motion.div>

        {/* Steps Progress */}
        <div className="flex justify-center mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i <= step ? "bg-rich-purple text-white" : "bg-rich-gray/30 text-rich-gold/50"
                }`}
              >
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 ${
                    i < step ? "bg-rich-purple" : "bg-rich-gray/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
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
                >
                  {step === steps.length - 1 ? (
                    "Submit Application"
                  ) : (
                    <>
                      Next Step
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
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
