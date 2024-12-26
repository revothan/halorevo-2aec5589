import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Check,
  Zap,
  ArrowRight,
  Clock,
  Settings,
  Sparkles,
  Shield,
  Rocket,
} from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Standard",
      price: 750,
      description:
        "Perfect for businesses ready to scale their digital presence",
      features: [
        "1 Request at a Time",
        "Unlimited Revisions",
        "48-Hour Turnaround Time",
        "Dedicated Project Manager",
        "Premium Design Assets",
        "Source Code Included",
        "Mobile-First Development",
        "SEO Optimization",
        "Regular Maintenance Updates",
      ],
      setupFee: 500,
      icon: Rocket,
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Pro",
      price: 1000,
      description:
        "Ideal for businesses needing faster delivery and more flexibility",
      features: [
        "2 Parallel Requests",
        "Priority Support",
        "24-Hour Turnaround Time",
        "Dedicated Project Manager",
        "Premium Design Assets",
        "Source Code Included",
        "Mobile-First Development",
        "Advanced SEO Optimization",
        "Priority Maintenance",
        "API Integration Support",
        "Performance Optimization",
        "Technical Consultation",
      ],
      setupFee: 500,
      icon: Sparkles,
      color: "from-rich-gold to-amber-500",
      popular: true,
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-rich-blue/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-rich-gold/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-rich-blue/10 px-4 py-2 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-rich-blue" />
            <span className="text-sm font-mono text-rich-blue">
              Simple Pricing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Choose Your <span className="text-rich-gold">Growth Plan</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Flexible plans designed to help your business grow. Start, pause, or
            cancel anytime. All plans include a one-time setup fee of $500 to
            ensure proper onboarding and system setup.
          </motion.p>

          {/* Value Props */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12"
          >
            {[
              { icon: Clock, text: "Pause or Cancel Anytime" },
              { icon: Settings, text: "Seamless Integration" },
              { icon: Shield, text: "100% Satisfaction Guaranteed" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 justify-center"
              >
                <div className="p-2 rounded-lg bg-rich-blue/10">
                  <Icon className="w-4 h-4 text-rich-blue" />
                </div>
                <span className="text-sm text-gray-400">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className={`
                  relative rounded-xl backdrop-blur-sm
                  ${plan.popular ? "bg-rich-gray/40 border-2 border-rich-gold/30" : "bg-rich-gray/30 border border-white/10"}
                `}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-rich-gold to-amber-500 text-rich-black px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {plan.description}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${plan.color}`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      One-time setup fee: ${plan.setupFee}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Check className="w-5 h-5 text-rich-gold" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`
                      w-full py-6 rounded-lg font-medium inline-flex items-center justify-center gap-2
                      ${
                        plan.popular
                          ? "bg-gradient-to-r from-rich-gold to-amber-500 text-rich-black hover:brightness-110"
                          : "bg-rich-blue hover:bg-rich-blue/90 text-white"
                      }
                    `}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Money-Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm">
            14-day money-back guarantee • No long-term contracts • Cancel
            anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
