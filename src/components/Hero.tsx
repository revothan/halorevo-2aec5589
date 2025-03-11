import React, { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Terminal, ArrowRight, Code, Workflow, Sparkles } from "lucide-react";
import { TypingAnimation } from "./TypingAnimation";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; // Add Helmet if not already using it

const Portfolio3DCarousel = lazy(() => import("./Portfolio3DCarousel"));

interface HeroProps {
  showContent?: boolean;
}

export const Hero = ({ showContent = true }: HeroProps) => {
  const navigate = useNavigate();

  const features = [
    { icon: Code, text: "Small Business Website Development" },
    { icon: Workflow, text: "Affordable Web Solutions" },
    { icon: Sparkles, text: "Free Consultation in Vancouver" },
  ];

  const handleServicesClick = () => {
    navigate("/services");
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray relative">
      {/* SEO-friendly heading structure */}
      <Helmet>
        <title>
          Best Web Development Agency for Small Business in Vancouver | HaloRevo
        </title>
        <meta
          name="description"
          content="HaloRevo is Vancouver's top web development agency specializing in creating professional websites for small businesses across Canada."
        />
      </Helmet>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 bg-rich-blue/10 px-4 py-2 rounded-full">
              <Terminal className="w-4 h-4 text-rich-blue" />
              <span className="text-sm font-mono text-rich-blue">
                Vancouver's #1 Small Business Web Development Agency
              </span>
            </div>

            {showContent && (
              <>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">Professional Websites for</span>{" "}
                  <br />
                  <span className="text-rich-gold">
                    Canadian Small Businesses
                  </span>
                </h1>

                <h2 className="text-xl text-gray-300 max-w-lg">
                  Elevate your small business with custom-built, affordable
                  websites designed to attract customers and drive growth.
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleServicesClick}
                    className="bg-rich-purple hover:bg-rich-purple/90 text-white px-8 py-6 rounded-lg font-medium inline-flex items-center gap-2 relative z-20"
                  >
                    Free Website Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-rich-gold/30 text-rich-gold hover:bg-rich-gold/10 px-8 py-6 rounded-lg"
                    onClick={() => navigate("/portfolio")}
                  >
                    Small Business Portfolio
                  </Button>
                </div>

                {/* Features List */}
                <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
                  {features.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-rich-blue/10">
                        <Icon className="w-5 h-5 text-rich-blue" />
                      </div>
                      <span className="text-sm text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Right Column - 3D Portfolio Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-rich-blue to-rich-gold opacity-10 blur-xl rounded-xl pointer-events-none" />
            <div className="relative">
              <Suspense
                fallback={
                  <div className="h-96 animate-pulse bg-rich-gray/20 rounded-xl" />
                }
              >
                <Portfolio3DCarousel />
              </Suspense>
            </div>
          </motion.div>
        </div>

        {/* Small Business Focus Section - Added for SEO */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Serving Small Businesses Across Canada
          </h3>
          <p className="max-w-3xl mx-auto text-gray-400">
            From local Vancouver shops to online Canadian entrepreneurs, we
            create websites that help small businesses succeed. Schedule a free
            meeting to discuss your needs today.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
