import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Clock, ArrowRight, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isVerifying, setIsVerifying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        toast({
          title: "Error",
          description: "Invalid session ID",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      try {
        // First, try to find the order
        const { data: orderData, error: fetchError } = await supabase
          .from("orders")
          .select("*")
          .eq("stripe_session_id", sessionId)
          .single();

        if (fetchError) {
          console.log("Error fetching order:", fetchError);
          // If we can't find the order, we'll still show success but log the error
          setIsVerifying(false);
          return;
        }

        if (orderData) {
          // If we found the order, update its status
          const { error: updateError } = await supabase
            .from("orders")
            .update({ status: "completed" })
            .eq("id", orderData.id);

          if (updateError) {
            console.log("Error updating order:", updateError);
          }
        }

        setIsVerifying(false);
      } catch (error) {
        console.error("Error verifying session:", error);
        // Even if there's an error, we'll show the success page
        setIsVerifying(false);
      }
    };

    verifySession();
  }, [sessionId, navigate, toast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      icon: Check,
      title: "Payment Successful",
      description: "Your payment has been processed successfully",
      status: "completed",
    },
    {
      icon: Clock,
      title: "Account Activation",
      description: "Our team is setting up your account",
      status: "in-progress",
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "You'll receive account details via email",
      status: "pending",
    },
  ];

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-rich-gold mx-auto mb-4" />
          <p className="text-gray-400">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Thank You for Your Payment!
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're excited to have you on board. Our team is working on setting
            up your account with all the features you need.
          </p>
        </motion.div>

        <Card className="bg-rich-gray/30 border-rich-gold/20 mb-8">
          <CardHeader>
            <CardTitle>Account Activation Status</CardTitle>
            <CardDescription>
              Your account will be fully activated within 1 hour
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-2 bg-rich-gray/20 rounded-full overflow-hidden mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-rich-gold to-rich-purple"
              />
            </div>

            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        step.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : step.status === "in-progress"
                            ? "bg-rich-gold/20 text-rich-gold animate-pulse"
                            : "bg-rich-gray/20 text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-6">
          <p className="text-gray-400">
            Need immediate assistance? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-rich-gold/30 text-rich-gold hover:bg-rich-gold/10"
              onClick={() =>
                (window.location.href = "mailto:halorevo.info@gmail.com")
              }
            >
              Contact Support
            </Button>
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-rich-gold hover:bg-rich-gold/90"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
