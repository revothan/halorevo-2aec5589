import React from "react";
import { motion } from "framer-motion";

const FloatingElement = ({ delay = 0, className = "" }) => (
  <motion.div
    className={`absolute opacity-20 rounded-full blur-xl ${className}`}
    animate={{
      y: [0, -20, 0],
      scale: [1, 1.1, 1],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
    }}
  />
);

const BackgroundShapes = () => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.1" />
        <stop offset="100%" stopColor="#9B51E0" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <pattern
      id="grid"
      x="0"
      y="0"
      width="10"
      height="10"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M 10 0 L 0 0 0 10"
        fill="none"
        stroke="url(#grid-gradient)"
        strokeWidth="0.5"
      />
    </pattern>
    <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />
  </svg>
);

export const HookSection = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="relative overflow-hidden py-32 bg-gradient-to-b from-gray-900 to-black">
      {/* Background grid pattern */}
      <BackgroundShapes />

      {/* Floating elements */}
      <FloatingElement
        delay={0}
        className="bg-blue-500 w-64 h-64 -left-32 top-0"
      />
      <FloatingElement
        delay={2}
        className="bg-purple-500 w-96 h-96 -right-48 bottom-0"
      />

      {/* Main content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-4"
        >
          <motion.h1
            className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 bg-clip-text text-transparent bg-300% animate-gradient"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            Transform Your Website Into a Growth Engine
          </motion.h1>

          <motion.p
            className="text-2xl text-gray-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Choose between a one-time website development or unlock unlimited
            updates with our revolutionary subscription model.
          </motion.p>

          {/* Call to action buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={scrollToServices}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none" />
    </div>
  );
};

// Add required styles to make the gradient animation work
const style = document.createElement("style");
style.textContent = `
  .bg-300% {
    background-size: 300% 300%;
  }
  
  .animate-gradient {
    animation: gradient 8s linear infinite;
  }
  
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
document.head.appendChild(style);

export default HookSection;
