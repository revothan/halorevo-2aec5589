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

const Services = () => {
  const { toast } = useToast();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [pendingPriceId, setPendingPriceId] = useState<string | null>(null);
  const [pendingMode, setPendingMode] = useState<'payment' | 'subscription' | null>(null);

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription') => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setPendingPriceId(priceId);
      setPendingMode(mode);
      setShowCustomerForm(true);
      return;
    }

    proceedToCheckout(priceId, mode);
  };

  const proceedToCheckout = async (priceId: string, mode: 'payment' | 'subscription') => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId, mode },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to process checkout. Please try again.",
      });
    }
  };

  const handleCustomerFormSuccess = () => {
    setShowCustomerForm(false);
    if (pendingPriceId && pendingMode) {
      proceedToCheckout(pendingPriceId, pendingMode);
    }
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

        <ServiceHeader />
        <WebsiteRedesign onCheckout={handleCheckout} />
        <ServicePlans onCheckout={handleCheckout} />
        <ContactCTA />

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