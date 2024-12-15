import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Check, X } from "lucide-react";

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    "Teaching AI to make coffee...",
    "Convincing bugs they're actually features...",
    "Warming up the flux capacitor...",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === steps.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 1000); // Give time for the last animation
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-rich-black flex items-center justify-center z-50"
    >
      <div className="glass-card p-8 max-w-md w-full mx-4">
        <div className="flex items-center gap-2 mb-6">
          <Terminal className="w-5 h-5 text-rich-gold" />
          <span className="font-mono text-rich-gold">system.boot</span>
        </div>
        
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isComplete = currentStep > index;
            const isCurrent = currentStep === index;
            
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: currentStep >= index ? 1 : 0,
                  y: currentStep >= index ? 0 : 10
                }}
                className="flex items-center gap-2"
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  {isComplete && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                  {isCurrent && (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-rich-gold border-t-transparent rounded-full"
                    />
                  )}
                  {!isComplete && !isCurrent && (
                    <X className="w-4 h-4 text-rich-gray" />
                  )}
                </span>
                <span className={`font-mono text-sm ${
                  isComplete ? 'text-rich-gold' : 
                  isCurrent ? 'text-rich-gold' : 
                  'text-rich-gray'
                }`}>
                  {step}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};