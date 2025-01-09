import React from "react";
import { Infinity as InfinityIcon, Zap, LayoutDashboard } from "lucide-react";
import { Feature } from "./Feature";
import { supabase } from "@/integrations/supabase/client";

export const StorySection: React.FC = () => {
  // Get the image URL from Supabase storage
  const dashboardImageUrl = supabase.storage
    .from("images")
    .getPublicUrl("/dashboard.gif").data?.publicUrl;

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="relative">
              {dashboardImageUrl && (
                <img
                  src={dashboardImageUrl}
                  alt="Dashboard Preview"
                  className="rounded-lg shadow-2xl"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 to-transparent rounded-lg"></div>
            </div>
          </div>
          <div className="space-y-6">
            <Feature
              icon={<InfinityIcon className="w-6 h-6 text-blue-400" />}
              title="Two Flexible Options"
              description="One-Time Development: Perfect for new websites. Unlimited Subscription: Ongoing development & updates"
            />
            <Feature
              icon={<Zap className="w-6 h-6 text-purple-400" />}
              title="Lightning Fast Turnaround"
              description="Basic Plan: Average 24-hour turnaround. Pro Plan: Priority 5-hour turnaround"
            />
            <Feature
              icon={<LayoutDashboard className="w-6 h-6 text-green-400" />}
              title="Intuitive Dashboard"
              description="Track all your requests, communicate with developers and designers, and manage your subscription in one place."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
