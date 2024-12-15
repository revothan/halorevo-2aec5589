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

  const renderPortfolioContent = () => {
    return (
      <div className="space-y-8 text-left">
        {/* Menyapa.Live Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-gradient">1. Menyapa.Live – Full Stack Websites</h3>
          <p className="text-rich-gold/90 font-mono">
            <span className="italic">Menyapa.Live</span> is an Indonesian AI chatbot platform designed specifically for businesses 
            and content creators to connect with their audiences in a more interactive and meaningful way. 
            I spearheaded the <span className="text-rich-purple">full-stack development</span> of the website, 
            creating a seamless and user-friendly experience for users to set up custom chatbot solutions.
          </p>
          
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
          <h3 className="text-xl font-bold text-gradient">2. Baza Dance Studios – Marketing and Website Automations</h3>
          <p className="text-rich-gold/90 font-mono">
            At <span className="italic">Baza Dance Studios</span> in Vancouver, I took on the dual role of managing 
            the website's backend processes and implementing <span className="text-rich-purple">automation solutions</span> to 
            streamline marketing efforts and boost sales.
          </p>
          
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
            onClick={() => {
              setIsOpen(false);
              // Find the "Pricing" folder and trigger its click
              const pricingFolder = document.querySelector('[data-folder="Pricing"]');
              if (pricingFolder) {
                (pricingFolder as HTMLElement).click();
              }
            }}
            className="w-full font-mono group"
          >
            Check out my pricing
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    );
  };

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
                {title === "About Me" ? renderAboutMeContent() : 
                 title === "My Portfolio" ? renderPortfolioContent() : (
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