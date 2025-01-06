import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServicePlansProps {
  onCheckout: (priceId: string, mode: 'payment' | 'subscription') => Promise<void>;
}

export const ServicePlans = ({ onCheckout }: ServicePlansProps) => {
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

  return (
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
              onClick={() => onCheckout('price_1QePyPAoXQ4jQHytQrweTFLM', 'subscription')}
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
              onClick={() => onCheckout('price_1QePylAoXQ4jQHytr58VwyHS', 'subscription')}
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};