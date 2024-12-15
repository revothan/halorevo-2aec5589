import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { TypingAnimation } from "./TypingAnimation";

export const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black to-rich-gray opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Terminal-like header */}
          <div className="glass-card p-4 mb-8 inline-block">
            <div className="flex items-center gap-2 text-rich-yellow">
              <Terminal className="w-5 h-5" />
              <span className="font-mono">$ init portfolio.exe</span>
            </div>
          </div>
          
          <span className="inline-block text-sm uppercase tracking-wider text-rich-blue animate-fade-up animate-delay-1 font-mono">
            {'>'} Digital Solutions for Modern Businesses_
          </span>
          
          <TypingAnimation
            texts={["Hey, Vancouver!", "This is Halo Revo."]}
            className="text-4xl md:text-6xl font-bold leading-tight"
          />
          
          <p className="text-lg md:text-xl text-rich-gold/80 animate-fade-up animate-delay-3 font-mono">
            Websites & Automations That Work for You
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up animate-delay-3">
            <Button
              size="lg"
              className="bg-rich-purple hover:bg-rich-purple/90 text-rich-black font-mono"
            >
              {'>'} Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-rich-blue text-rich-blue hover:bg-rich-blue/10 font-mono"
            >
              {'>'} View Portfolio
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