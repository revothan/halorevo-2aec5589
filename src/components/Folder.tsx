import { useState } from "react";
import { Folder as FolderIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderWindow } from "./FolderWindow";
import { FolderPortfolioContent } from "./FolderPortfolioContent";
import { FolderAboutContent } from "./FolderAboutContent";
import { FolderPricingContent } from "./FolderPricingContent";

interface FolderProps {
  title: string;
  color?: string;
}

export const Folder = ({ title, color = "#FDE1D3" }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    // Find the "Pricing" folder and trigger its click if we're in the Portfolio
    if (title === "My Portfolio") {
      const pricingFolder = document.querySelector('[data-folder="Pricing"]');
      if (pricingFolder) {
        (pricingFolder as HTMLElement).click();
      }
    }
    // Find the "My Portfolio" folder and trigger its click if we're in About Me
    if (title === "About Me") {
      const portfolioFolder = document.querySelector('[data-folder="My Portfolio"]');
      if (portfolioFolder) {
        (portfolioFolder as HTMLElement).click();
      }
    }
  };

  const renderContent = () => {
    switch (title) {
      case "About Me":
        return <FolderAboutContent onClose={handleClose} />;
      case "My Portfolio":
        return <FolderPortfolioContent onClose={handleClose} />;
      case "Pricing":
        return <FolderPricingContent onClose={handleClose} />;
      default:
        return (
          <p className="text-rich-gold/80 font-mono">
            Content for {title} coming soon...
          </p>
        );
    }
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
          <FolderWindow title={title} onClose={() => setIsOpen(false)}>
            {renderContent()}
          </FolderWindow>
        )}
      </AnimatePresence>
    </div>
  );
};