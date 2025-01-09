import {
  Check,
  ArrowRight,
  Zap,
  Star,
  Clock,
  Wrench,
  Globe,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CustomerData } from "@/types";

interface ServicePlansProps {
  onCheckout: (
    priceId: string,
    mode: "payment" | "subscription",
  ) => Promise<void>;
}

export const ServicePlans = ({ onCheckout }: ServicePlansProps) => {
  const { toast } = useToast();
  
  const features = {
    basic: [
      {
        icon: <Clock className="w-5 h-5" />,
        title: "24-Hour Delivery",
        description: "Average 1-day turnaround for your requests",
      },
      {
        icon: <Wrench className="w-5 h-5" />,
        title: "Unlimited Development",
        description: "Submit unlimited requests, one at a time",
      },
      {
        icon: <Globe className="w-5 h-5" />,
        title: "Dashboard Access",
        description: "Track all your requests in one place",
      },
      {
        icon: <HeartHandshake className="w-5 h-5" />,
        title: "Priority Support",
        description: "Get help via email within 24 hours",
      },
    ],
    pro: [
      {
        icon: <Zap className="w-5 h-5" />,
        title: "5-Hour Turnaround",
        description: "Lightning fast delivery for urgent updates",
      },
      {
        icon: <Wrench className="w-5 h-5" />,
        title: "Double Capacity",
        description: "Work on two requests simultaneously",
      },
      {
        icon: <Star className="w-5 h-5" />,
        title: "Premium Features",
        description: "Hosting, domain, and dedicated manager included",
      },
      {
        icon: <Globe className="w-5 h-5" />,
        title: "Enhanced Support",
        description: "Direct Discord access and weekly meetings",
      },
    ],
  };

  const PlanFeature = ({ icon, title, description }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg transition-colors">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );

  const handleBasicPlanCheckout = async (customerData: CustomerData) => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout",
        {
          body: {
            priceId: "price_1QePpLAoXQ4jQHytMv0c2i4F", // Basic subscription
            mode: "subscription",
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

  const handleProPlanCheckout = async (customerData: CustomerData) => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout",
        {
          body: {
            priceId: "price_1QePplAoXQ4jQHyteyxHfl1b", // Pro subscription
            mode: "subscription",
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

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Unlimited Development Plans
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs. All plans include
            unlimited development requests and our commitment to quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <Card className="glass-card border-rich-blue/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rich-blue to-rich-blue/50" />
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl text-rich-blue mb-2">
                    Basic Plan
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Perfect for growing businesses
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-rich-blue/10 text-rich-blue"
                >
                  Most Popular
                </Badge>
              </div>
              <div className="text-3xl font-bold text-rich-gold">
                $1,350
                <span className="text-lg text-rich-gold/60 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.basic.map((feature, index) => (
                  <PlanFeature key={index} {...feature} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-rich-blue/5 rounded-lg">
                <h4 className="text-rich-blue font-semibold mb-2">
                  Also Included:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Unlimited revisions",
                    "SEO optimizations",
                    "Performance monitoring",
                    "Basic security updates",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <Check className="w-4 h-4 text-rich-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-rich-blue hover:bg-rich-blue/80 py-6"
                onClick={handleBasicPlanCheckout}
              >
                Get Started with Basic
                <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="glass-card border-rich-green/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rich-green to-rich-green/50" />
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl text-rich-green mb-2">
                    Pro Plan
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    For businesses that need speed
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-rich-green/10 text-rich-green"
                >
                  Fastest Delivery
                </Badge>
              </div>
              <div className="text-3xl font-bold text-rich-gold">
                $2,000
                <span className="text-lg text-rich-gold/60 ml-2">/month</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.pro.map((feature, index) => (
                  <PlanFeature key={index} {...feature} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-rich-green/5 rounded-lg">
                <h4 className="text-rich-green font-semibold mb-2">
                  Pro Benefits:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Quarterly website health checks",
                    "Monthly performance analytics",
                    "Premium hosting included",
                    "1-year domain registration",
                    "Advanced security suite",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <Check className="w-4 h-4 text-rich-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-rich-green hover:bg-rich-green/80 py-6"
                onClick={handleProPlanCheckout}
              >
                Get Started with Pro
                <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>
            All plans include a 14-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};
