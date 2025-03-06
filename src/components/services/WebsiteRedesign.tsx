
import { Globe, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CustomerData } from "@/types";

interface WebsiteRedesignProps {
  onCheckout: (
    priceId: string,
    mode: "payment" | "subscription",
  ) => Promise<void>;
}

export const WebsiteRedesign = ({ onCheckout }: WebsiteRedesignProps) => {
  const { toast } = useToast();

  const PricingFeature = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 text-gray-300">
      <Check className="w-4 h-4 text-rich-purple" />
      <span>{text}</span>
    </div>
  );

  const handleCheckout = async (formData: CustomerData) => {
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout",
        {
          body: {
            priceId: "price_1QePkqAoXQ4jQHytmXhhPjJq", // One-time website development
            mode: "payment",
            customerData: {
              name: formData.name,
              email: formData.email,
            },
            referralCode: formData.referralCode || null,
          },
        },
      );

      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description:
          error.message || "Unable to process checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-rich-gray/20">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card border-rich-purple/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl md:text-3xl text-rich-purple flex items-center gap-2">
                <Globe className="w-6 h-6" />
                Pengembangan Website Sekali Bayar
              </CardTitle>
            </div>
            <CardDescription className="text-rich-gold/80 text-lg">
              Dapatkan website profesional yang mengonversi dibangun dari awal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-4xl font-bold text-rich-gold">
                Rp 31.000.000
                <span className="text-lg text-rich-gold/60 ml-2">
                  sekali bayar
                </span>
              </div>
              <p className="text-gray-400 mt-2">
                Semua yang Anda butuhkan untuk meluncurkan website profesional Anda
              </p>
            </div>

            <div className="grid gap-4">
              <h3 className="text-xl font-semibold text-rich-purple">
                Yang Termasuk:
              </h3>
              <div className="grid gap-3">
                <PricingFeature text="Desain kustom yang disesuaikan dengan identitas merek Anda" />
                <PricingFeature text="Halaman tanpa batas (Beranda, Tentang Kami, Layanan, Kontak, Kustom)" />
                <PricingFeature text="5 Fitur Termasuk (Formulir Pengajuan, Dasbor, dll.)" />
                <PricingFeature text="Tata letak responsif untuk seluler yang berfungsi di semua perangkat" />
                <PricingFeature text="Pengaturan dan optimasi SEO dasar" />
                <PricingFeature text="Formulir kontak dan integrasi email" />
                <PricingFeature text="Revisi tanpa batas termasuk" />
              </div>

              <div className="mt-4 p-4 bg-rich-purple/10 rounded-lg">
                <h4 className="text-rich-purple font-semibold mb-2">
                  Jadwal Pengiriman
                </h4>
                <p className="text-gray-300">
                  Website Anda akan siap dalam waktu 2 minggu setelah menerima konten 
                  dan aset merek Anda
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              size="lg"
              className="w-full bg-rich-purple hover:bg-rich-purple/80 text-lg py-6"
              onClick={() => handleCheckout({ name: "", email: "", referralCode: null })}
            >
              <ShoppingCart className="mr-2" />
              Mulai Sekarang - Rp 31.000.000
            </Button>
            <p className="text-center text-sm text-gray-400">
              Butuh lebih banyak halaman atau fitur kustom? Hubungi kami untuk penawaran kustom
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
