
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
                  alt="Pratinjau Dashboard"
                  className="rounded-lg shadow-2xl"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 to-transparent rounded-lg"></div>
            </div>
          </div>
          <div className="space-y-6">
            <Feature
              icon={<InfinityIcon className="w-6 h-6 text-blue-400" />}
              title="Dua Opsi Fleksibel"
              description="Pengembangan Sekali Bayar: Sempurna untuk website baru. Langganan Tanpa Batas: Pengembangan & pembaruan berkelanjutan"
            />
            <Feature
              icon={<Zap className="w-6 h-6 text-purple-400" />}
              title="Waktu Penyelesaian Super Cepat"
              description="Paket Dasar: Rata-rata penyelesaian 24 jam. Paket Pro: Prioritas penyelesaian 5 jam"
            />
            <Feature
              icon={<LayoutDashboard className="w-6 h-6 text-green-400" />}
              title="Dashboard Intuitif"
              description="Lacak semua permintaan Anda, berkomunikasi dengan pengembang dan desainer, dan kelola langganan Anda di satu tempat."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
