import { X, Minus, Maximize2 } from "lucide-react";
import { motion } from "framer-motion";

interface FolderWindowProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const FolderWindow = ({ title, onClose, children }: FolderWindowProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-rich-black/80" onClick={onClose} />
      
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
              onClick={onClose}
            >
              <X className="w-4 h-4 text-rich-gold/70" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};