import { Hero } from "@/components/Hero";
import PorfolioSection from "@/components/PortfolioSection";
import HowItWorks from "@/components/HowItWorks";
import QnASection from "@/components/QnASection";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import PricingSection from "@/components/Pricing";
import { Minus, Square, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-rich-black min-h-screen p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto glass-card overflow-hidden border border-rich-gray/30">
        {/* Window Controls */}
        <div className="flex items-center justify-between bg-rich-gray px-4 py-2 border-b border-rich-gray/30">
          <div className="text-sm text-rich-gold/70 font-mono">
            halo-revo.exe
          </div>
          <div className="flex items-center gap-4">
            <Link to="/blog">
              <Button variant="ghost" className="text-rich-gold/70 hover:text-rich-gold">
                Blog
              </Button>
            </Link>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-rich-gray/50 rounded">
                <Minus className="w-4 h-4 text-rich-gold/70" />
              </button>
              <button className="p-1 hover:bg-rich-gray/50 rounded">
                <Square className="w-4 h-4 text-rich-gold/70" />
              </button>
              <button className="p-1 hover:bg-rich-gray/50 rounded">
                <X className="w-4 h-4 text-rich-gold/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          <Hero />
          <PorfolioSection />
          <HowItWorks />
          <PricingSection />
          <QnASection />
          <AboutUs />
          <Footer />
        </div>
      </div>
    </motion.main>
  );
};

export default Index;