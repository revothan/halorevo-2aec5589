import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
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
      // Generate a unique referral code based on timestamp and random string
      const referralCode = `REF${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
      
      const { error } = await supabase
        .from("affiliate_profiles")
        .insert([
          {
            user_id: session.user.id,
            referral_code: referralCode,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your affiliate application has been submitted. You'll be notified once it's approved.",
      });
      
      navigate("/affiliate/dashboard");
    } catch (error: any) {
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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto glass-card p-8">
          <h1 className="text-3xl font-bold text-rich-gold mb-6">
            Become an Affiliate
          </h1>
          
          <div className="space-y-6 text-rich-gold/80">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Why become an affiliate?</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Earn 50% commission on all referrals for 6 months</li>
                <li>Get paid monthly for successful referrals</li>
                <li>Access to exclusive affiliate resources and support</li>
                <li>Track your earnings in real-time</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">How it works</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Sign up as an affiliate</li>
                <li>Get your unique referral code</li>
                <li>Share with potential clients</li>
                <li>Earn commissions on successful referrals</li>
              </ol>
            </div>

            <Button 
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Sign Up as Affiliate"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateSignup;