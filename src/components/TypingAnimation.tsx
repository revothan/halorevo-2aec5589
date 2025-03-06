
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingAnimationProps {
  texts: string[];
  className?: string;
}

export const TypingAnimation = ({ texts, className = "" }: TypingAnimationProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const currentText = texts[currentTextIndex];
  const words = currentText.split(' ');

  useEffect(() => {
    if (currentWords.length < words.length) {
      const timeout = setTimeout(() => {
        setCurrentWords(words.slice(0, currentWords.length + 1));
      }, 300); // Adjust timing as needed
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Loop back to start
        setCurrentWords([]);
      }, 2000); // Wait before starting next text
      return () => clearTimeout(timeout);
    }
  }, [currentWords.length, currentTextIndex, words.length, texts.length]);

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {currentWords.map((word, index) => (
          <motion.span
            key={`${currentTextIndex}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="inline-block mr-2"
          >
            {word}
            {index === currentWords.length - 1 && currentTextIndex === 0 && "🇮🇩"}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
