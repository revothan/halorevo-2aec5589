import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import CategorySection from "./qna/CategorySection";
import { faqs } from "./qna/faqData";

const QnASection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Common <span className="text-rich-gold">Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to frequently asked questions about our services,
            process, and technical details.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <CategorySection
              key={category.category}
              category={category}
              categoryIndex={categoryIndex}
              activeIndex={activeIndex}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QnASection;