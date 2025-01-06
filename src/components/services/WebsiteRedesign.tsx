import { Globe, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WebsiteRedesignProps {
  onCheckout: (priceId: string, mode: 'payment' | 'subscription') => Promise<void>;
}

export const WebsiteRedesign = ({ onCheckout }: WebsiteRedesignProps) => {
  return (
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
              onClick={() => onCheckout('price_1QePtyAoXQ4jQHytu7dUPRTD', 'payment')}
            >
              <ShoppingCart className="mr-2" />
              Purchase Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};