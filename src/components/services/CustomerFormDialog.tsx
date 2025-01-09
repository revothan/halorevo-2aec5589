import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, User, Key } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const customerFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  referralCode: z.string().optional(),
});

type CustomerFormData = z.infer<typeof customerFormSchema>;

interface CustomerFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: CustomerFormData) => void; // Updated to pass form data
}

export const CustomerFormDialog = ({
  isOpen,
  onClose,
  onSuccess,
}: CustomerFormDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerFormSchema),
  });

  const onSubmit = async (data: CustomerFormData) => {
    setIsLoading(true);
    try {
      // First verify referral code if provided
      if (data.referralCode) {
        console.log("Checking referral code:", data.referralCode);

        // Use the service role client for affiliate profiles query
        const { data: affiliateData, error: affiliateError } = await supabase
          .from("affiliate_profiles")
          .select("id, status, referral_code")
          .eq("referral_code", data.referralCode)
          .eq("status", "approved")
          .limit(1);

        console.log("Affiliate query result:", {
          affiliateData,
          affiliateError,
        });

        // Handle query errors
        if (affiliateError) {
          console.error("Error checking referral code:", affiliateError);
          toast({
            title: "Error verifying referral code",
            description: "Please try again or continue without a referral code",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        // Handle no results or inactive referral code
        if (!affiliateData?.length) {
          console.log("No valid referral code found");
          toast({
            title: "Invalid referral code",
            description:
              "Please check your referral code or continue without one",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }

      // Create the user account
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name,
              referral_code: data.referralCode || null,
            },
          },
        },
      );

      if (signUpError) {
        console.error("Signup error:", signUpError);
        throw signUpError;
      }

      console.log("Account created successfully:", authData);

      toast({
        title: "Account created successfully!",
        description: "You can now proceed with your purchase.",
      });

      // Pass the form data back to parent component
      onSuccess(data);
      reset();
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create your account</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Your name"
                className="pl-10"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="pl-10"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="referralCode">Referral Code (Optional)</Label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="referralCode"
                placeholder="Enter referral code"
                className="pl-10"
                {...register("referralCode")}
              />
            </div>
            {errors.referralCode && (
              <p className="text-sm text-destructive">
                {errors.referralCode.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account & Continue"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
