import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Check, Code, Binary, Cpu } from "lucide-react";

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const steps = [
    {
      text: "Initializing quantum processors...",
      icon: Cpu,
      color: "text-blue-400",
    },
    {
      text: "Compiling creative algorithms...",
      icon: Code,
      color: "text-green-400",
    },
    {
      text: "Loading digital excellence...",
      icon: Binary,
      color: "text-purple-400",
    },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + 1;
        return next <= 100 ? next : 100;
      });
    }, 20); // Durasi lebih cepat

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === steps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800); // Durasi lebih cepat

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [onComplete, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-rich-black flex items-center justify-center z-50"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="w-full h-full grid grid-cols-12 grid-rows-12 gap-1 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-rich-gold"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.01,
              }}
            />
          ))}
        </motion.div>
      </div>

      <div className="relative glass-card p-8 max-w-md w-full mx-4 backdrop-blur-xl bg-rich-black/80 border border-rich-gold/20 rounded-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-rich-gold/10">
            <Terminal className="w-5 h-5 text-rich-gold" />
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-rich-gold text-lg"
          >
            HaloRevo System Boot
          </motion.span>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-1 w-full bg-rich-gray/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-rich-gold via-blue-500 to-rich-gold"
              initial={{ width: "0%" }}
              animate={{ width: `${loadingProgress}%` }}
              transition={{ duration: 0.2 }} // Transisi lebih cepat
            />
          </div>
          <div className="mt-2 text-right font-mono text-sm text-rich-gold/60">
            {loadingProgress}%
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          <AnimatePresence>
            {steps.map((step, index) => {
              const isComplete = currentStep > index;
              const isCurrent = currentStep === index;
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: currentStep >= index ? 1 : 0.3,
                    x: currentStep >= index ? 0 : -20,
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-rich-gray/10"
                >
                  <div className="w-8">
                    {isComplete ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-green-500" />
                      </motion.div>
                    ) : isCurrent ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1.5, // Lebih cepat dari sebelumnya
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-6 h-6"
                      >
                        <Icon className={`w-6 h-6 ${step.color}`} />
                      </motion.div>
                    ) : (
                      <Icon className="w-6 h-6 text-rich-gray/40" />
                    )}
                  </div>
                  <span
                    className={`font-mono text-sm ${
                      isComplete
                        ? "text-rich-gold"
                        : isCurrent
                          ? step.color
                          : "text-rich-gray/40"
                    }`}
                  >
                    {step.text}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
