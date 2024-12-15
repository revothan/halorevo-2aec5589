import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

interface FolderPortfolioContentProps {
  onClose: () => void;
}

export const FolderPortfolioContent = ({ onClose }: FolderPortfolioContentProps) => {
  return (
    <div className="space-y-8 text-left">
      {/* Menyapa.Live Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-bold text-gradient">
          1. <a 
            href="https://menyapa.live/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline inline-flex items-center gap-1"
          >
            Menyapa.Live <ExternalLink className="w-4 h-4" />
          </a> 
          – Full Stack Websites
        </h3>
        <p className="text-rich-gold/90 font-mono">
          <span className="italic">Menyapa.Live</span> is an Indonesian AI chatbot platform designed specifically for businesses 
          and content creators to connect with their audiences in a more interactive and meaningful way. 
          I spearheaded the <span className="text-rich-purple">full-stack development</span> of the website, 
          creating a seamless and user-friendly experience for users to set up custom chatbot solutions.
        </p>
        
        <Button
          variant="outline"
          className="w-full font-mono group"
          onClick={() => window.open('https://menyapa.live/', '_blank')}
        >
          Visit Menyapa.Live
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <div className="space-y-2">
          <h4 className="font-bold text-rich-blue">Key Contributions:</h4>
          <ul className="list-disc list-inside space-y-2 text-rich-gold/80 font-mono">
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Designed and implemented a responsive, visually appealing interface that makes it easy for users to navigate and create their own AI chatbot.
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Developed a robust backend to support user data, chatbot training, and integrations with popular platforms.
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Optimized site performance for speed and scalability, ensuring the platform can handle high user traffic.
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              Enabled secure payment processing for subscription plans and credit-based chatbot customization.
            </motion.li>
          </ul>
        </div>
        
        <p className="text-rich-gold/80 font-mono italic">
          Menyapa.Live is now empowering businesses across Indonesia to enhance customer engagement 
          and streamline their communication processes with AI-driven solutions.
        </p>
      </motion.div>

      <div className="w-full h-px bg-rich-gray/30" />

      {/* Baza Dance Studios Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-bold text-gradient">
          2. <a 
            href="https://www.bazadance.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline inline-flex items-center gap-1"
          >
            Baza Dance Studios <ExternalLink className="w-4 h-4" />
          </a> 
          – Marketing and Website Automations
        </h3>
        <p className="text-rich-gold/90 font-mono">
          At <span className="italic">Baza Dance Studios</span> in Vancouver, I took on the dual role of managing 
          the website's backend processes and implementing <span className="text-rich-purple">automation solutions</span> to 
          streamline marketing efforts and boost sales.
        </p>

        <Button
          variant="outline"
          className="w-full font-mono group"
          onClick={() => window.open('https://www.bazadance.com/', '_blank')}
        >
          Visit Baza Dance Studios
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
        
        <div className="space-y-2">
          <h4 className="font-bold text-rich-blue">Key Achievements:</h4>
          <ul className="list-disc list-inside space-y-2 text-rich-gold/80 font-mono">
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              Automated the <span className="text-rich-purple">sales process</span> by integrating lead generation from social media 
              directly into the website, reducing manual input and speeding up response times.
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              Built a system that tracks potential leads from platforms like Instagram and Facebook, 
              converting them into bookings through the website's interface.
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              Managed website updates to ensure smooth functionality and a modern design that reflects the studio's vibrant brand.
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              Enhanced email marketing campaigns with automated workflows, ensuring timely follow-ups and 
              personalized messages for leads and existing clients.
            </motion.li>
          </ul>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="pt-4"
      >
        <Button
          onClick={onClose}
          className="w-full font-mono group"
        >
          Check out my pricing
          <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
};