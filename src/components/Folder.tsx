import { useState } from "react";
import { Folder as FolderIcon, X, Minus, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FolderProps {
  title: string;
  color?: string;
}

export const Folder = ({ title, color = "#FDE1D3" }: FolderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Folder Icon */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-2 p-2"
        onClick={() => setIsOpen(true)}
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
              className="relative w-full max-w-2xl glass-card overflow-hidden"
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
              <div className="p-6">
                <p className="text-rich-gold/80 font-mono">
                  Content for {title} coming soon...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};