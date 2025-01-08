import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export const SubscriptionGate = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 rounded-lg border border-rich-gold/20 bg-rich-gray/30 text-center">
      <div className="mb-6">
        <Lock className="w-12 h-12 text-rich-gold mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">
          Subscription Required
        </h3>
        <p className="text-gray-400 mb-4">
          You need an active subscription to create and manage tasks. Unlock
          full access to task management features today!
        </p>
      </div>
      <Button
        onClick={() => navigate("/services")}
        className="bg-rich-gold hover:bg-rich-gold/90"
      >
        View Subscription Plans
      </Button>
    </div>
  );
};
