import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Coffee, Globe, Zap, Sparkles, MessageSquare } from "lucide-react";

interface FolderPricingContentProps {
  onClose: () => void;
}

export const FolderPricingContent = ({ onClose }: FolderPricingContentProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 font-mono"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gradient">Pricing</h2>
        <p className="text-rich-gold/80">
          Looking for a website that works as hard as you do? Or automation that makes your digital life a breeze? 
          I've got you covered with straightforward pricing that won't leave your wallet crying.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Website Creation */}
        <motion.div variants={item} className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-rich-purple">
            <Globe className="w-6 h-6" />
            <h3 className="text-xl font-bold">Website Creation</h3>
          </div>
          <p className="text-2xl font-bold text-rich-gold">$1,000</p>
          <p className="text-rich-gold/80">
            From sleek portfolios to robust e-commerce stores, I'll craft a website that doesn't just look amazing but actually works like a dream. Think of it as your 24/7 digital salesperson (minus the awkward small talk).
          </p>
        </motion.div>

        {/* Automation Services */}
        <motion.div variants={item} className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-rich-blue">
            <Zap className="w-6 h-6" />
            <h3 className="text-xl font-bold">Automation Services</h3>
          </div>
          <p className="text-2xl font-bold text-rich-gold">$1,000</p>
          <p className="text-rich-gold/80">
            Tired of copy-pasting and juggling a gazillion tabs? Let me automate your workflows so you can focus on what really matters—like sipping coffee while your business runs itself.
          </p>
        </motion.div>

        {/* Combo Deal */}
        <motion.div variants={item} className="glass-card p-6 space-y-4 relative overflow-hidden md:col-span-2 lg:col-span-1">
          <div className="absolute top-2 right-2">
            <span className="bg-rich-purple/20 text-rich-purple px-3 py-1 rounded-full text-sm">
              Best Value
            </span>
          </div>
          <div className="flex items-center gap-2 text-rich-green">
            <Sparkles className="w-6 h-6" />
            <h3 className="text-xl font-bold">Website + Automation Combo</h3>
          </div>
          <p className="text-2xl font-bold text-rich-gold">$2,500</p>
          <p className="text-rich-gold/80">
            Want the best of both worlds? Get a killer website <em>and</em> automation that feels like having a personal assistant (without the endless coffee breaks).
          </p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div variants={item} className="text-center space-y-4">
        <p className="text-rich-gold/80">
          Not sure which one suits you best? No worries! Let's chat and find the perfect solution for your business.
        </p>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="lg"
            className="group"
            onClick={() => {
              onClose();
              // Find and click the "Let's Work Together" folder
              const workTogetherFolder = document.querySelector('[data-folder="Let\'s Work Together"]');
              if (workTogetherFolder) {
                (workTogetherFolder as HTMLElement).click();
              }
            }}
          >
            <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
            Let's Work Together
          </Button>
          <p className="text-sm text-rich-gold/60 italic">
            (Because success is more fun when we do it together.)
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};