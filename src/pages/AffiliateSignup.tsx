import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  BadgeCheck,
  Loader2,
  DollarSign,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const AffiliateSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useSessionContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async () => {
    if (!session) {
      toast({
        title: "Please log in first",
        description: "You need to be logged in to become an affiliate.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    setIsLoading(true);
    try {
      const referralCode =
        `REF${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();

      const { error } = await supabase.from("affiliate_profiles").insert([
        {
          user_id: session.user.id,
          referral_code: referralCode,
        },
      ]);
      if (error) throw error;
      toast({
        title: "Welcome to our Affiliate Program! 🎉",
        description:
          "Your account has been created. Let's start earning together!",
      });

      navigate("/affiliate/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-rich-gold mb-4">
            Join Our Elite Affiliate Program
          </h1>
          <p className="text-xl text-rich-gold/80 max-w-2xl mx-auto">
            Turn your network into net worth! Earn up to 50% commission on every
            successful referral.
          </p>
        </div>

        {/* Earnings Calculator */}
        <Card className="mb-12 bg-rich-black/50 border-rich-gold/30">
          <CardHeader>
            <CardTitle className="text-2xl text-rich-gold">
              Earning Potential Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-rich-black/30">
                <DollarSign className="w-12 h-12 text-rich-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-rich-gold">Basic</h3>
                <p className="text-3xl font-bold text-rich-gold mt-2">$500</p>
                <p className="text-rich-gold/80 mt-2">5 referrals/month</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-rich-gold/10 border-2 border-rich-gold">
                <Award className="w-12 h-12 text-rich-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-rich-gold">
                  Premium
                </h3>
                <p className="text-3xl font-bold text-rich-gold mt-2">$2,000</p>
                <p className="text-rich-gold/80 mt-2">20 referrals/month</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-rich-black/30">
                <TrendingUp className="w-12 h-12 text-rich-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-rich-gold">Elite</h3>
                <p className="text-3xl font-bold text-rich-gold mt-2">
                  $5,000+
                </p>
                <p className="text-rich-gold/80 mt-2">50+ referrals/month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-rich-black/50 border-rich-gold/30">
            <CardHeader>
              <CardTitle className="text-2xl text-rich-gold flex items-center">
                <BadgeCheck className="w-6 h-6 mr-2 text-rich-gold" />
                Premium Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-rich-gold mt-1" />
                <p className="text-rich-gold/80">
                  <span className="font-bold text-rich-gold">
                    50% Commission Boost
                  </span>{" "}
                  after your first two successful referrals
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-rich-gold mt-1" />
                <p className="text-rich-gold/80">
                  <span className="font-bold text-rich-gold">
                    6-Month Cookie Duration
                  </span>{" "}
                  for maximum earning potential
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-rich-gold mt-1" />
                <p className="text-rich-gold/80">
                  <span className="font-bold text-rich-gold">
                    Real-Time Dashboard
                  </span>{" "}
                  with detailed analytics and tracking
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-rich-gold mt-1" />
                <p className="text-rich-gold/80">
                  <span className="font-bold text-rich-gold">
                    Priority Support
                  </span>{" "}
                  with dedicated affiliate manager
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-rich-black/50 border-rich-gold/30">
            <CardHeader>
              <CardTitle className="text-2xl text-rich-gold flex items-center">
                <Users className="w-6 h-6 mr-2 text-rich-gold" />
                Success Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-rich-gold mt-1" />
                <p className="text-rich-gold/80">
                  <span className="font-bold text-rich-gold">
                    Marketing Kit
                  </span>{" "}
                  with ready-to-use promotional materials
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-rich-gold mt-1" />
                <p className="text-rich-gold/80">
                  <span className="font-bold text-rich-gold">
                    Training Webinars
                  </span>{" "}
                  to maximize your earning potential
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-rich-gold mt-1" />
                <p className="text-rich-gold/80">
                  <span className="font-bold text-rich-gold">
                    Affiliate Community
                  </span>{" "}
                  for networking and tips sharing
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <ChevronRight className="w-5 h-5 text-rich-gold mt-1" />
                <p className="text-rich-gold/80">
                  <span className="font-bold text-rich-gold">
                    Custom Landing Pages
                  </span>{" "}
                  optimized for conversions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-2xl mx-auto text-center">
          <Alert className="mb-6 bg-rich-gold/10 border-rich-gold">
            <AlertDescription className="text-rich-gold text-lg">
              Limited Time Offer: Sign up now and receive an exclusive
              onboarding bonus!
            </AlertDescription>
          </Alert>

          <Button
            onClick={handleSignup}
            disabled={isLoading}
            className="w-64 h-12 text-lg bg-rich-gold hover:bg-rich-gold/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Start Earning Now"
            )}
          </Button>

          <p className="mt-4 text-rich-gold/80">
            Join {Math.floor(1000 + Math.random() * 9000)}+ successful
            affiliates already earning with us
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSignup;

