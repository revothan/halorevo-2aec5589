import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";

export const useSubscriptionStatus = () => {
  const { session } = useSessionContext();
  const [hasActiveSubscription, setHasActiveSubscription] = useState<
    boolean | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!session?.user?.email) {
        setHasActiveSubscription(false);
        setIsLoading(false);
        return;
      }

      try {
        // First, find the customer by email
        const { data: customerData } = await supabase
          .from("customers")
          .select("id")
          .eq("email", session.user.email)
          .single();

        if (!customerData) {
          setHasActiveSubscription(false);
          setIsLoading(false);
          return;
        }

        // Then check for any completed orders for this customer
        const { data: orderData } = await supabase
          .from("orders")
          .select("*")
          .eq("customer_id", customerData.id)
          .eq("status", "completed")
          .limit(1);

        setHasActiveSubscription(!!orderData?.length);
      } catch (error) {
        console.error("Error checking subscription:", error);
        setHasActiveSubscription(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [session]);

  return { hasActiveSubscription, isLoading };
};
