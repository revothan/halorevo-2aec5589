import {
  Check,
  ArrowRight,
  Zap,
  Star,
  Clock,
  Wrench,
  Globe,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CustomerData } from "@/types";
import { CustomerFormDialog } from "./CustomerFormDialog";

interface ServicePlansProps {
  onCheckout: (priceId: string, mode: "payment" | "subscription") => Promise<void>;
}

export const ServicePlans = ({ onCheckout }: ServicePlansProps) => {
  const { toast } = useToast();
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState<{
    handler: (data: CustomerData) => Promise<void>;
  } | null>(null);

  const features = {
    basic: [
      {
        icon: <Clock className="w-5 h-5" />,
        title: "Pengiriman 24 Jam",
        description: "Rata-rata penyelesaian permintaan dalam 1 hari",
      },
      {
        icon: <Wrench className="w-5 h-5" />,
        title: "Pengembangan Tanpa Batas",
        description: "Ajukan permintaan tanpa batas, satu per satu",
      },
      {
        icon: <Globe className="w-5 h-5" />,
        title: "Akses Dashboard",
        description: "Pantau semua permintaan Anda di satu tempat",
      },
      {
        icon: <HeartHandshake className="w-5 h-5" />,
        title: "Dukungan Prioritas",
        description: "Dapatkan bantuan via email dalam 24 jam",
      },
    ],
    pro: [
      {
        icon: <Zap className="w-5 h-5" />,
        title: "Penyelesaian 5 Jam",
        description: "Pengiriman super cepat untuk pembaruan mendesak",
      },
      {
        icon: <Wrench className="w-5 h-5" />,
        title: "Kapasitas Ganda",
        description: "Kerjakan dua permintaan secara bersamaan",
      },
      {
        icon: <Star className="w-5 h-5" />,
        title: "Fitur Premium",
        description: "Hosting, domain, dan manajer khusus tersedia",
      },
      {
        icon: <Globe className="w-5 h-5" />,
        title: "Dukungan Ditingkatkan",
        description: "Akses Discord langsung dan pertemuan mingguan",
      },
    ],
  };

  const PlanFeature = ({ icon, title, description }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg transition-colors">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );

  const handleBasicPlanCheckout = async (customerData: CustomerData) => {
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceId: "price_1QePpLAoXQ4jQHytMv0c2i4F", // Basic subscription
          mode: "subscription",
          customerData: {
            name: customerData.name,
            email: customerData.email,
          },
          referralCode: customerData.referralCode || null,
        },
      });

      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Unable to process checkout. Please try again.",
      });
    }
  };

  const handleProPlanCheckout = async (customerData: CustomerData) => {
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          priceId: "price_1QePplAoXQ4jQHyteyxHfl1b", // Pro subscription
          mode: "subscription",
          customerData: {
            name: customerData.name,
            email: customerData.email,
          },
          referralCode: customerData.referralCode || null,
        },
      });

      if (error) throw error;
      if (data?.url) window.location.href = data.url;
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Unable to process checkout. Please try again.",
      });
    }
  };

  const handleCustomerFormSuccess = (formData: CustomerData) => {
    if (pendingCheckout) {
      pendingCheckout.handler(formData);
    }
    setShowCustomerForm(false);
    setPendingCheckout(null);
  };

  const initiateCheckout = (handler: (data: CustomerData) => Promise<void>) => {
    setPendingCheckout({ handler });
    setShowCustomerForm(true);
  };

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Paket Pengembangan Tanpa Batas
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Pilih paket yang sempurna untuk kebutuhan bisnis Anda. Semua paket mencakup
            permintaan pengembangan tanpa batas dan komitmen kami terhadap kualitas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Basic Plan */}
          <Card className="glass-card border-rich-blue/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rich-blue to-rich-blue/50" />
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl text-rich-blue mb-2">
                    Paket Dasar
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Sempurna untuk bisnis yang sedang berkembang
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-rich-blue/10 text-rich-blue"
                >
                  Paling Populer
                </Badge>
              </div>
              <div className="text-3xl font-bold text-rich-gold">
                Rp 21.000.000
                <span className="text-lg text-rich-gold/60 ml-2">/bulan</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.basic.map((feature, index) => (
                  <PlanFeature key={index} {...feature} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-rich-blue/5 rounded-lg">
                <h4 className="text-rich-blue font-semibold mb-2">
                  Juga Termasuk:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Revisi tanpa batas",
                    "Optimasi SEO",
                    "Pemantauan kinerja",
                    "Pembaruan keamanan dasar",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <Check className="w-4 h-4 text-rich-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-rich-blue hover:bg-rich-blue/80 py-6"
                onClick={() => initiateCheckout(handleBasicPlanCheckout)}
              >
                Mulai dengan Paket Dasar
                <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="glass-card border-rich-green/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rich-green to-rich-green/50" />
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl text-rich-green mb-2">
                    Paket Pro
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Untuk bisnis yang membutuhkan kecepatan
                  </CardDescription>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-rich-green/10 text-rich-green"
                >
                  Pengiriman Tercepat
                </Badge>
              </div>
              <div className="text-3xl font-bold text-rich-gold">
                Rp 31.000.000
                <span className="text-lg text-rich-gold/60 ml-2">/bulan</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.pro.map((feature, index) => (
                  <PlanFeature key={index} {...feature} />
                ))}
              </div>
              <div className="mt-6 p-4 bg-rich-green/5 rounded-lg">
                <h4 className="text-rich-green font-semibold mb-2">
                  Manfaat Pro:
                </h4>
                <ul className="space-y-2">
                  {[
                    "Pemeriksaan kesehatan website triwulanan",
                    "Analitik kinerja bulanan",
                    "Hosting premium termasuk",
                    "Pendaftaran domain 1 tahun",
                    "Paket keamanan tingkat lanjut",
                  ].map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-400"
                    >
                      <Check className="w-4 h-4 text-rich-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-rich-green hover:bg-rich-green/80 py-6"
                onClick={() => initiateCheckout(handleProPlanCheckout)}
              >
                Mulai dengan Paket Pro
                <ArrowRight className="ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>
            Semua paket termasuk jaminan uang kembali 14 hari. Tanpa pertanyaan.
          </p>
        </div>
      </div>

      <CustomerFormDialog
        isOpen={showCustomerForm}
        onClose={() => {
          setShowCustomerForm(false);
          setPendingCheckout(null);
        }}
        onSuccess={handleCustomerFormSuccess}
      />
    </section>
  );
};
