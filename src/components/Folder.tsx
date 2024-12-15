import { useState } from "react";
import { Folder as FolderIcon, X, Minus, Maximize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface FolderProps {
  title: string;
  color?: string;
}

export const Folder = ({ title, color = "#FDE1D3" }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const renderAboutMeContent = () => {
    return (
      <div className="space-y-6 text-left">
        <div className="space-y-4">
          <p className="text-rich-gold/90 font-mono">
            Hi there! I'm <span className="font-bold text-gradient">Revo Nathanael Siagian</span>, your friendly neighborhood tech wizard. 
            I specialize in <span className="text-rich-purple">website creation</span> and <span className="text-rich-blue">automating digital processes</span>, 
            helping businesses cut through chaos and conquer the digital world.
          </p>
          
          <p className="text-rich-gold/80 font-mono italic">
            My story? Well, let's just say I've been hustling since I was in diapers... almost.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gradient font-mono">Revo's Legendary Timeline:</h3>
          
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            {[
              { year: "2004", text: "Born. Clearly destined for greatness." },
              { year: "2006", text: "Learned to code. Why? To hack my way to infinite lives in video games. Spoiler alert: It didn't work." },
              { year: "2015", text: "Founded Designerku. Yes, a high-schooler running a design business. I even wore glasses to look more professional (even though I didn't need them)." },
              { year: "2022-2024", text: "Studied Computer Science at Columbia College. Became that person who codes at coffee shops." },
              { year: "2022", text: "Worked as Marketing Coordinator at Baza Dance Studios, Vancouver. Fun fact: I can sell dance classes like it's nobody's business, but my two left feet are staying off the dance floor." },
              { year: "2023", text: "Launched Halo Revo—where I combined my marketing and tech skills into one unstoppable automation machine." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-4 p-4 glass-card hover:bg-rich-gray/20 transition-colors"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <span className="text-rich-purple font-mono whitespace-nowrap">{item.year}</span>
                <p className="text-rich-gold/80 font-mono">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="space-y-4">
          <p className="text-rich-gold/80 font-mono">
            When I'm not building websites or automating processes, you can find me geeking out over tech trends, 
            eating way too much ramen, or pretending I'm a world-class DJ while coding to lo-fi beats.
          </p>
          
          <p className="text-rich-gold/80 font-mono">
            Curious? Ready to team up?
          </p>

          <Button
            onClick={() => {
              setIsOpen(false);
              // Find the "My Portfolio" folder and trigger its click
              const portfolioFolder = document.querySelector('[data-folder="My Portfolio"]');
              if (portfolioFolder) {
                (portfolioFolder as HTMLElement).click();
              }
            }}
            className="w-full font-mono group"
          >
            Check out my portfolio
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Folder Icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2 p-2"
        onClick={() => setIsOpen(true)}
        data-folder={title}
      >
        <FolderIcon className="w-16 h-16" style={{ color }} />
        <span className="text-sm text-rich-gold/80 font-mono max-w-[120px] truncate">
          {title}
        </span>
      </motion.button>

      {/* Folder Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="fixed inset-0 bg-rich-black/80" onClick={() => setIsOpen(false)} />
            
            <motion.div
              className="relative w-full max-w-3xl glass-card overflow-hidden"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              exit={{ y: 20 }}
            >
              {/* Window Controls */}
              <div className="flex items-center justify-between bg-rich-gray px-4 py-2 border-b border-rich-gray/30">
                <div className="text-sm text-rich-gold/70 font-mono">{title}.exe</div>
                <div className="flex gap-2">
                  <button className="p-1 hover:bg-rich-gray/50 rounded">
                    <Minus className="w-4 h-4 text-rich-gold/70" />
                  </button>
                  <button className="p-1 hover:bg-rich-gray/50 rounded">
                    <Maximize2 className="w-4 h-4 text-rich-gold/70" />
                  </button>
                  <button 
                    className="p-1 hover:bg-rich-gray/50 rounded"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4 text-rich-gold/70" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                {title === "About Me" ? renderAboutMeContent() : (
                  <p className="text-rich-gold/80 font-mono">
                    Content for {title} coming soon...
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};