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

    // Get price information from Stripe
    const price = await stripe.prices.retrieve(priceId);
    console.log("Retrieved price information:", price);

    if (!price) {
      throw new Error("Price not found");
    }

    // Validate referral code if provided
    let affiliateProfile = null;
    if (referralCode) {
      console.log("Checking referral code:", referralCode);
      
      // First, let's get all affiliate profiles to debug
      const { data: allProfiles, error: allProfilesError } = await supabase
        .from("affiliate_profiles")
        .select("*");
      
      console.log("All affiliate profiles:", allProfiles);
      
      if (allProfilesError) {
        console.error("Error fetching all profiles:", allProfilesError);
      }

      const { data: affiliate, error: affiliateError } = await supabase
        .from("affiliate_profiles")
        .select("*")
        .eq("referral_code", referralCode)
        .eq("status", "approved")
        .single();

      console.log("Affiliate query result:", { affiliate, affiliateError });

      if (affiliateError) {
        console.log("Error checking referral code:", affiliateError);
        throw new Error("Invalid referral code");
      }

      if (!affiliate) {
        console.log("No affiliate found or not approved");
        throw new Error("Invalid or inactive referral code");
      }

      console.log("Valid affiliate found:", affiliate);
      affiliateProfile = affiliate;
    }

    // Create or retrieve Stripe customer
    let stripeCustomer;
    try {
      const { data: existingCustomers } = await stripe.customers.search({
        query: `email:'${customerData.email}'`,
      });

      if (existingCustomers && existingCustomers.length > 0) {
        stripeCustomer = existingCustomers[0];
        console.log("Found existing Stripe customer:", stripeCustomer);
      } else {
        stripeCustomer = await stripe.customers.create({
          email: customerData.email,
          name: customerData.name,
        });
        console.log("Created new Stripe customer:", stripeCustomer);
      }
    } catch (error) {
      console.error("Error with Stripe customer:", error);
      throw error;
    }

    // Create or update customer in our database
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .upsert(
        {
          stripe_customer_id: stripeCustomer.id,
          email: customerData.email,
          name: customerData.name,
        },
        { onConflict: "stripe_customer_id" }
      )
      .select()
      .single();

    if (customerError) {
      console.error("Error creating/updating customer:", customerError);
      throw customerError;
    }

    console.log("Customer record created/updated:", customer);

    // Create order record with price information
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_id: customer.id,
        price_id: priceId,
        mode: mode,
        status: "pending",
        affiliate_id: affiliateProfile?.id || null,
        amount: price.unit_amount ? price.unit_amount / 100 : null, // Convert from cents to dollars
        currency: price.currency,
        metadata: {
          referral_code: referralCode || null,
        },
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw orderError;
    }

    console.log("Order record created:", order);

    console.log("Creating checkout session...");
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode || "subscription",
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/services`,
      allow_promotion_codes: true,
      billing_address_collection: "required",
      metadata: {
        order_id: order.id,
        referral_code: referralCode || "",
      },
    });

    // Update order with session ID
    const { error: updateError } = await supabase
      .from("orders")
      .update({ stripe_session_id: session.id })
      .eq("id", order.id);

    if (updateError) {
      console.error("Error updating order with session ID:", updateError);
      throw updateError;
    }

    console.log("Checkout session created:", session.id);

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