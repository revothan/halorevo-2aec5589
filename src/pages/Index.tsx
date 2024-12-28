import { Hero } from "@/components/Hero";
import PorfolioSection from "@/components/PortfolioSection";
import HowItWorks from "@/components/HowItWorks";
import QnASection from "@/components/QnASection";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import PricingSection from "@/components/Pricing";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-rich-black min-h-screen p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto glass-card overflow-hidden border border-rich-gray/30">
        <Navbar />
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