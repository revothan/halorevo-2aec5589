import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { TypingAnimation } from "./TypingAnimation";
import { Folder } from "./Folder";

interface HeroProps {
  showContent?: boolean;
}

export const Hero = ({ showContent = true }: HeroProps) => {
  const folders = [
    { title: "About Me", color: "#F2FCE2" },
    { title: "Let's Work Together", color: "#FEF7CD" },
    { title: "What Does Revo Offer?", color: "#FEC6A1" },
    { title: "My Portfolio", color: "#E5DEFF" },
    { title: "Pricing", color: "#FFDEE2" }
  ];

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 relative overflow-hidden cursor-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgBY2RgYPj/n+E/AxbACFPACFPEgAVgVYRLATZ5rArwuQQA+OgPOzQqoj4AAAAASUVORK5CYII='),auto]">
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black to-rich-gray opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="inline-block text-sm uppercase tracking-wider text-rich-blue animate-fade-up animate-delay-1 font-mono">
            {'>'} Digital Solutions for Modern Businesses_
          </span>
          
          {showContent && (
            <TypingAnimation
              texts={["Hey, Vancouver!", "This is Halo Revo."]}
              className="text-4xl md:text-6xl font-bold leading-tight"
            />
          )}
          
          <p className="text-lg md:text-xl text-rich-gold/80 animate-fade-up animate-delay-3 font-mono">
            Websites & Automations That Work for You
          </p>
        </div>

        {/* Folders Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 justify-items-center"
        >
          {folders.map((folder) => (
            <Folder key={folder.title} {...folder} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};