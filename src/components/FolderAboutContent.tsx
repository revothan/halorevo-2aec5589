import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

export const FolderAboutContent = ({ onClose }: { onClose: () => void }) => {
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
            { year: "2010", text: "Learned to code. Why? To hack my way to infinite lives in video games. Spoiler alert: It didn't work." },
            { year: "2018", text: "Founded Designerku. Yes, a high-schooler running a design business. I even wore glasses to look more professional (even though I didn't need them)." },
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
          onClick={onClose}
          className="w-full font-mono group"
        >
          Check out my portfolio
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};
