import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Code, Globe, Zap, ArrowRight } from "lucide-react";

interface FolderOfferContentProps {
  onClose: () => void;
}

export const FolderOfferContent = ({ onClose }: FolderOfferContentProps) => {
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
      className="space-y-8"
    >
      {/* Introduction */}
      <motion.div variants={item} className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gradient">What Does Revo Offer?</h2>
        <p className="text-rich-gold/80 text-lg">I'm glad you asked! Here's what I bring to the table:</p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Website Creation */}
        <motion.div variants={item} className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 text-rich-purple mb-4">
            <Globe className="w-8 h-8" />
            <h3 className="text-xl font-bold">Website Creation</h3>
          </div>
          <p className="text-rich-gold/80 mb-4">
            Need a website that doesn't just look great but actually works? I design and build websites tailored to your business goals.
          </p>
          <ul className="space-y-2 text-rich-gold/80">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 text-rich-purple" />
              Sleek, modern, and responsive designs
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 text-rich-purple" />
              Optimized for speed, SEO, and user experience
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 text-rich-purple" />
              Fully customizable to reflect your unique brand identity
            </li>
          </ul>
        </motion.div>

        {/* Automation Services */}
        <motion.div variants={item} className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3 text-rich-blue mb-4">
            <Zap className="w-8 h-8" />
            <h3 className="text-xl font-bold">Automation Services</h3>
          </div>
          <p className="text-rich-gold/80 mb-4">
            Say goodbye to boring, repetitive tasks! I create custom automations to streamline your digital processes.
          </p>
          <ul className="space-y-2 text-rich-gold/80">
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 text-rich-blue" />
              Automate workflows like lead generation, sales, and data management
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 text-rich-blue" />
              Save time and reduce human errors with seamless integrations
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 text-rich-blue" />
              Focus on growing your business while the tech handles the grunt work
            </li>
          </ul>
        </motion.div>

        {/* Website + Automation Combo */}
        <motion.div variants={item} className="glass-card p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-3 right-3 bg-rich-purple text-white text-xs px-2 py-1 rounded-full">
            Best Value
          </div>
          <div className="flex items-center gap-3 text-rich-green mb-4">
            <Code className="w-8 h-8" />
            <h3 className="text-xl font-bold">Website + Automation Combo</h3>
          </div>
          <p className="text-rich-gold/80">
            Why stop at just one? Let me combine the magic of stunning websites with the efficiency of automations. It's like having a business superpower at your fingertips.
          </p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div variants={item} className="text-center mt-12 space-y-6">
        <p className="text-rich-gold/80 text-lg">
          With every project, I focus on delivering solutions that are not only functional but also help you achieve your goals faster. Ready to make your digital dreams come true?
        </p>
        <Button 
          onClick={onClose}
          className="bg-rich-purple hover:bg-rich-purple/90 text-white font-semibold px-8 py-6 text-lg"
        >
          LET'S WORK TOGETHER
          <ArrowRight className="ml-2" />
        </Button>
        <p className="text-rich-gold/60 text-sm">Let's make it happen!</p>
      </motion.div>
    </motion.div>
  );
};