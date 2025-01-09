import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  category: string;
}

const PortfolioCarouselItem = memo(
  ({ item, position }: { item: PortfolioItem; position: any }) => (
    <motion.div
      className="absolute w-full h-full"
      initial={false}
      animate={position}
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
          loading="lazy"
          decoding="async"
          onError={(e) => {
            console.error(`Error loading image for ${item.title}`);
            // Set a fallback image or handle the error as needed
            e.currentTarget.src = "/api/placeholder/800/600";
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-sm text-rich-gold">{item.category}</p>
        </div>
      </div>
    </motion.div>
  ),
);

PortfolioCarouselItem.displayName = "PortfolioCarouselItem";

const Portfolio3DCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Define your portfolio items with correct bucket and path references
        const portfolioData = [
          {
            id: 1,
            title: "Product Management",
            path: "ecommerce.gif",
            category: "Product Management",
          },
          {
            id: 2,
            title: "Business Dashboard",
            path: "analytics.gif",
            category: "Analytics",
          },
          {
            id: 3,
            title: "E-commerce Store",
            path: "addproduct.gif",
            category: "E-commerce Store",
          },
        ];

        // Get public URLs for all images
        const itemsWithUrls = await Promise.all(
          portfolioData.map(async (item) => {
            // Get public URL from Supabase storage
            const { data: publicUrlData } = supabase.storage
              .from("images")
              .getPublicUrl(item.path);

            if (!publicUrlData.publicUrl) {
              console.warn(`No public URL found for ${item.path}`);
              throw new Error(`Failed to get public URL for ${item.path}`);
            }

            return {
              ...item,
              image: publicUrlData.publicUrl,
            };
          }),
        );

        setPortfolioItems(itemsWithUrls);
      } catch (err) {
        console.error("Error fetching portfolio items:", err);
        setError("Failed to load portfolio items");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    if (isAutoPlaying && portfolioItems.length > 0) {
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
    const translateZ = 250;

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

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rich-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-rich-gold">
        {error}
      </div>
    );
  }

  if (portfolioItems.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-rich-gold">
        No portfolio items available
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 perspective-1000">
      <div className="relative w-full h-full transform-style-3d">
        {portfolioItems.map((item, index) => (
          <PortfolioCarouselItem
            key={item.id}
            item={item}
            position={calculatePosition(index)}
          />
        ))}
      </div>

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

export default memo(Portfolio3DCarousel);

