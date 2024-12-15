import { Folder as FolderIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FolderProps {
  title: string;
  onClick: () => void;
  position: { top: string; left: string };
}

export const Folder = ({ title, onClick, position }: FolderProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="absolute flex flex-col items-center gap-2 p-2 rounded hover:bg-rich-gray/20"
      style={position}
      onClick={onClick}
    >
      <FolderIcon className="w-16 h-16 text-rich-gold" />
      <span className="text-xs text-rich-gold/70 font-mono">{title}</span>
    </motion.button>
  );
};