import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FolderWindowProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const FolderWindow = ({ title, isOpen, onClose, children }: FolderWindowProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: 50 }}
            className="relative w-full max-w-2xl glass-card overflow-hidden"
          >
            <div className="flex items-center justify-between bg-rich-gray px-4 py-2 border-b border-rich-gray/30">
              <div className="text-sm text-rich-gold/70 font-mono">{title}.exe</div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-rich-gray/50 rounded"
              >
                <X className="w-4 h-4 text-rich-gold/70" />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};