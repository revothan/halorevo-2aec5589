import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { priceId, mode, customerData, referralCode } = await req.json();
    console.log("Received request with:", {
      priceId,
      mode,
      customerData,
      referralCode,
    });

    if (!priceId) {
      throw new Error("Price ID is required");
    }

    // Initialize Stripe and Supabase
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Validate referral code if provided
    let affiliateProfile = null;
    if (referralCode) {
      console.log("Checking referral code:", referralCode);

      // First, check if the code exists at all
      const { data: affiliate, error: affiliateError } = await supabase
        .from("affiliate_profiles")
        .select("*")
        .eq("referral_code", referralCode)
        .single();

      if (affiliateError) {
        console.log("Error checking referral code:", affiliateError);
        if (affiliateError.code === "PGRST116") {
          return new Response(
            JSON.stringify({
              error:
                "Invalid referral code. Please check your referral code or leave it empty",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
              status: 400,
            },
          );
        }
        throw affiliateError;
      }

      // If code exists, check if it's approved
      if (!affiliate) {
        return new Response(
          JSON.stringify({
            error:
              "Invalid referral code. Please check your referral code or leave it empty",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          },
        );
      }

      if (affiliate.status !== "approved") {
        console.log("Referral code found but not approved:", affiliate);
        return new Response(
          JSON.stringify({
            error:
              "This referral code is not active. Please check your referral code or leave it empty",
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          },
        );
      }

      console.log("Valid affiliate found:", affiliate);
      affiliateProfile = affiliate;
    }

    // Rest of your existing code for customer creation and checkout...
    // [Previous customer and checkout handling code remains the same]

    console.log("Creating checkout session...");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode || "subscription",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/services`,
      ...(stripeCustomer && { customer: stripeCustomer.id }),
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: {
        referral_code: referralCode || "",
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in checkout process:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

