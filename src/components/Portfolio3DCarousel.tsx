import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  category: string;
}

const Portfolio3DCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      image: "/api/placeholder/400/300",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Business Dashboard",
      image: "/api/placeholder/400/300",
      category: "Analytics",
    },
    {
      id: 3,
      title: "Mobile App",
      image: "/api/placeholder/400/300",
      category: "App Development",
    },
    {
      id: 4,
      title: "Portfolio Website",
      image: "/api/placeholder/400/300",
      category: "Web Design",
    },
    {
      id: 5,
      title: "AI Integration",
      image: "/api/placeholder/400/300",
      category: "AI Solutions",
    },
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isAutoPlaying, portfolioItems.length]);

  const calculatePosition = (index: number) => {
    const baseIndex = currentIndex;
    let relativeIndex = index - baseIndex;

    if (relativeIndex < 0) {
      relativeIndex += portfolioItems.length;
    }

    const rotationY = relativeIndex * (360 / portfolioItems.length);
    const translateZ = 250; // Radius of the carousel

    return {
      rotateY: rotationY,
      translateZ: -translateZ,
      opacity: relativeIndex === 0 ? 1 : 0.6,
      zIndex: relativeIndex === 0 ? 1 : 0,
    };
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(
      (prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length,
    );
  };

  return (
    <div className="relative w-full h-96 perspective-1000">
      <div className="relative w-full h-full transform-style-3d">
        {portfolioItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute w-full h-full"
            initial={false}
            animate={calculatePosition(index)}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          >
            <div className="relative w-full h-full group">
              <div className="absolute inset-0 bg-gradient-to-b from-rich-black/20 to-rich-black/80 rounded-xl" />
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-rich-gold">{item.category}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-rich-black/50 rounded-full hover:bg-rich-black/80 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-rich-black/50 rounded-full hover:bg-rich-black/80 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default Portfolio3DCarousel;
