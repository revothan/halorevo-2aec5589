import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { ServiceHeader } from "@/components/services/ServiceHeader";
import { WebsiteRedesign } from "@/components/services/WebsiteRedesign";
import { ServicePlans } from "@/components/services/ServicePlans";
import { ContactCTA } from "@/components/services/ContactCTA";
import { CustomerFormDialog } from "@/components/services/CustomerFormDialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HookSection } from "@/components/services/HookSection";
import { StorySection } from "@/components/services/StorySection";
import { FAQSection } from "@/components/services/FAQ";
import Footer from "@/components/Footer";
import { CustomerData } from "@/types";

const Services: React.FC = () => {
  const { toast } = useToast();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [pendingPriceId, setPendingPriceId] = useState<string | null>(null);
  const [pendingMode, setPendingMode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("features");

  const handleCheckout = async (priceId: string, mode: string) => {
    setPendingPriceId(priceId);
    setPendingMode(mode);
    setShowCustomerForm(true);
  };

  const proceedToCheckout = async (customerData: CustomerData) => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout",
        {
          body: {
            priceId: pendingPriceId,
            mode: pendingMode,
            customerData: {
              name: customerData.name,
              email: customerData.email,
            },
            referralCode: customerData.referralCode || null,
          },
        },
      );

      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Unable to process checkout. Please try again.",
      });
    }
  };

  const handleCustomerFormSuccess = (formData: CustomerData) => {
    setShowCustomerForm(false);
    proceedToCheckout(formData);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-rich-black min-h-screen"
    >
      <div className="max-w-7xl mx-auto glass-card border border-rich-gray/30">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>

        <HookSection />
        <StorySection />

        <div className="flex flex-col md:flex-row gap-4 justify-center mx-4 mb-8">
          <Alert className="bg-blue-600/20 border-blue-400 md:w-1/2">
            <AlertDescription className="text-center text-lg">
              🚀 One-Time Website Development
              <br />
              <span className="text-sm text-gray-400">
                Perfect for quick launches
              </span>
            </AlertDescription>
          </Alert>
          <Alert className="bg-purple-600/20 border-purple-400 md:w-1/2">
            <AlertDescription className="text-center text-lg">
              ♾️ Unlimited Web Development Plans
              <br />
              <span className="text-sm text-gray-400">
                Basic & Pro subscriptions available
              </span>
            </AlertDescription>
          </Alert>
        </div>

        <ServiceHeader />
        <ServicePlans onCheckout={handleCheckout} />
        <WebsiteRedesign onCheckout={handleCheckout} />
        <FAQSection />
        <ContactCTA />
        <Footer />

        <CustomerFormDialog
          isOpen={showCustomerForm}
          onClose={() => setShowCustomerForm(false)}
          onSuccess={handleCustomerFormSuccess}
        />
      </div>
    </motion.main>
  );
};

export default Services;
