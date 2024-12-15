import { motion } from "framer-motion";
import { Folder as FolderIcon } from "lucide-react";

interface FolderProps {
  title: string;
  onClick: () => void;
  className?: string;
}

export const Folder = ({ title, onClick, className = "" }: FolderProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 group ${className}`}
    >
      <FolderIcon className="w-12 h-12 text-rich-gold/70 group-hover:text-rich-gold transition-colors" />
      <span className="text-xs text-rich-gold/70 group-hover:text-rich-gold transition-colors font-mono max-w-[100px] text-center">
        {title}
      </span>
    </motion.button>
  );
};