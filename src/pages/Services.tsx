import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Check,
  Mail,
  Globe,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

const Services = () => {
  const { toast } = useToast();
  const features = {
    basic: [
      "Unlimited Requests (One at a time)",
      "Unlimited Revisions (One at a time)",
      "Average 1 Day Turnaround",
      "Dedicated Dashboard Access",
      "Priority Email Support",
    ],
    pro: [
      "Unlimited Requests (Two at a time)",
      "Unlimited Revisions (Two at a time)",
      "Hosting Plan Included",
      "Domain Included for 1 year",
      "Average 5 Hour Turnaround",
      "Dedicated Project Manager",
      "Monthly Performance Analytics",
      "Quarterly Website Health Check",
    ],
  };

  const handleCheckout = async (priceId: string, mode: 'payment' | 'subscription') => {
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

        {/* Header Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-rich-gold"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-rich-gold/80"
            >
              Transforming your web presence with our professional and affordable
              services.
            </motion.p>
          </div>
        </section>

        {/* Website Redesign Section */}
        <section className="py-16 px-4 md:px-8 bg-rich-gray/20">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card border-rich-purple/20">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-rich-purple flex items-center gap-2">
                  <Globe className="w-6 h-6" />
                  Website Redesign
                </CardTitle>
                <CardDescription className="text-rich-gold/80">
                  Get a modern, user-friendly website redesign tailored to your
                  business needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-rich-gold mb-4">
                  $750
                  <span className="text-lg text-rich-gold/60 ml-2">
                    Lifetime Access
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full md:w-auto bg-rich-purple hover:bg-rich-purple/80"
                  onClick={() => handleCheckout('YOUR_WEBSITE_REDESIGN_PRICE_ID', 'payment')}
                >
                  <ShoppingCart className="mr-2" />
                  Purchase Now
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Productized Services Section */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <Card className="glass-card border-rich-blue/20">
              <CardHeader>
                <CardTitle className="text-2xl text-rich-blue">
                  Basic Plan
                </CardTitle>
                <div className="text-3xl font-bold text-rich-gold">
                  $1,350
                  <span className="text-lg text-rich-gold/60 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {features.basic.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-rich-gold/80"
                    >
                      <Check className="w-5 h-5 text-rich-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-rich-blue hover:bg-rich-blue/80"
                  onClick={() => handleCheckout('YOUR_BASIC_PLAN_PRICE_ID', 'subscription')}
                >
                  Get Started
                  <ArrowRight className="ml-2" />
                </Button>
              </CardFooter>
            </Card>

            {/* Pro Plan */}
            <Card className="glass-card border-rich-green/20">
              <CardHeader>
                <CardTitle className="text-2xl text-rich-green">
                  Pro Plan
                </CardTitle>
                <div className="text-3xl font-bold text-rich-gold">
                  $2,000
                  <span className="text-lg text-rich-gold/60 ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {features.pro.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-rich-gold/80"
                    >
                      <Check className="w-5 h-5 text-rich-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-rich-green hover:bg-rich-green/80"
                  onClick={() => handleCheckout('YOUR_PRO_PLAN_PRICE_ID', 'subscription')}
                >
                  Get Started
                  <ArrowRight className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 md:px-8 bg-rich-gray/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-rich-gold mb-8">
              Have Questions? Let's Talk!
            </h2>
            <Button
              className="bg-rich-purple hover:bg-rich-purple/80"
              onClick={() => window.location.href = "/contact"}
            >
              <Mail className="mr-2" />
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </motion.main>
  );
};

export default Services;