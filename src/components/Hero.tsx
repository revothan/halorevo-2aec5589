import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black to-rich-gray opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="inline-block text-sm uppercase tracking-wider text-rich-gold animate-fade-up animate-delay-1">
            Digital Solutions for Modern Businesses
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-up animate-delay-2">
            Your Partner in
            <span className="text-gradient"> Digital Transformation</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 animate-fade-up animate-delay-3">
            Websites & Automations That Work for You
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up animate-delay-3">
            <Button
              size="lg"
              className="bg-rich-gold hover:bg-rich-gold/90 text-rich-black"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-rich-gold text-rich-gold hover:bg-rich-gold/10"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-rich-gold"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};