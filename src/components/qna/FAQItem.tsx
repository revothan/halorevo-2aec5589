import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Question {
  question: string;
  answer: string;
}

interface FAQItemProps {
  item: Question;
  index: number;
  isActive: boolean;
  onToggle: (index: number) => void;
}

const FAQItem: React.FC<FAQItemProps> = memo(({ item, index, isActive, onToggle }) => {
  const isMobile = window.innerWidth < 768;

  const animationProps = isMobile ? {
    initial: { height: 0, opacity: 0 },
    animate: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
    transition: { duration: 0.15 }
  } : {
    initial: { scaleY: 0, opacity: 0 },
    animate: { scaleY: 1, opacity: 1 },
    exit: { scaleY: 0, opacity: 0 },
    transition: { duration: 0.2 }
  };

  return (
    <div
      className={`rounded-xl border transform-gpu ${
        isActive
          ? "bg-rich-gray/40 border-rich-gold/30"
          : "bg-rich-gray/20 border-white/10"
      }`}
    >
      <button
        onClick={() => onToggle(index)}
        className="w-full text-left p-4 flex items-center justify-between"
      >
        <span
          className={`font-medium ${
            isActive ? "text-rich-gold" : "text-white"
          }`}
        >
          {item.question}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isActive ? "rotate-180 text-rich-gold" : "text-gray-400"
          }`}
        />
      </button>
      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            {...animationProps}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-gray-400">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FAQItem.displayName = "FAQItem";

export default FAQItem;