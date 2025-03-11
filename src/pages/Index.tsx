import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Loader2 } from "lucide-react";
import { StorySection } from "@/components/services/StorySection";
import SmallBusinessFAQ from "@/components/SmallBusinessFAQ"; // Import the FAQ component
import { Services } from "@/components/Services"; // Make sure this is imported

const PorfolioSection = lazy(() => import("@/components/PortfolioSection"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const QnASection = lazy(() => import("@/components/QnASection"));
const Footer = lazy(() => import("@/components/Footer"));
const AboutUs = lazy(() => import("@/components/AboutUs"));
const PricingSection = lazy(() => import("@/components/Pricing"));
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-rich-gold" />
  </div>
);

const Index = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-rich-black min-h-screen p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto glass-card border border-rich-gray/30 relative">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div>
          <Hero />
          <Suspense fallback={<LoadingSpinner />}>
            <StorySection />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Services />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <HowItWorks />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <PorfolioSection />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <SmallBusinessFAQ />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <AboutUs />
          </Suspense>
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </motion.main>
  );
};

export default Index;
