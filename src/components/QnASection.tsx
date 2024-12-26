import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare, Zap } from "lucide-react";

// Separate FAQ data outside component to prevent recreation
const faqs = [
  {
    category: "Services",
    questions: [
      {
        question: "What types of projects do you handle?",
        answer:
          "We specialize in web development, business automation, and digital solutions. Our services include custom website development, e-commerce solutions, business process automation, and digital transformation consulting.",
      },
      {
        question: "How does your monthly subscription work?",
        answer:
          "Our monthly subscription provides you with dedicated development services. You can submit requests one at a time (Standard) or two in parallel (Pro), and we'll work on them with quick turnaround times. You can pause or cancel anytime.",
      },
      {
        question: "What's included in the setup fee?",
        answer:
          "The setup fee covers initial onboarding, project planning, setting up development environments, creating necessary accounts, and establishing communication channels. This ensures a smooth start to our partnership.",
      },
    ],
  },
  {
    category: "Process",
    questions: [
      {
        question: "How long does each project take?",
        answer:
          "Turnaround times vary by plan - Standard plan offers 48-hour turnaround, while Pro plan ensures 24-hour turnaround. Complex projects might require multiple requests, but we'll always communicate timelines clearly.",
      },
      {
        question: "What if I need revisions?",
        answer:
          "We offer unlimited revisions to ensure your complete satisfaction. Our goal is to deliver exactly what you envision, and we'll work with you until we get it right.",
      },
      {
        question: "Can I pause my subscription?",
        answer:
          "Yes! You can pause your subscription at any time and resume when you're ready. We understand that business needs can fluctuate, and we want to provide flexibility.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        question: "What technologies do you work with?",
        answer:
          "We work with modern web technologies including React, Next.js, Node.js, Python, and various databases. We also integrate with popular services and APIs based on your needs.",
      },
      {
        question: "Do I get access to the source code?",
        answer:
          "Yes, you receive full access to all source code we develop for your projects. This includes documentation and deployment instructions.",
      },
      {
        question: "How do you handle hosting and deployment?",
        answer:
          "We can deploy to your preferred hosting platform or recommend solutions based on your needs. We commonly work with AWS, Vercel, Netlify, and other modern hosting providers.",
      },
    ],
  },
];

// Memoized FAQ Item Component
const FAQItem = memo(({ item, index, isActive, onToggle }) => (
  <div
    className={`rounded-xl border ${
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
        className={`font-medium ${isActive ? "text-rich-gold" : "text-white"}`}
      >
        {item.question}
      </span>
      <ChevronDown
        className={`w-4 h-4 ${isActive ? "text-rich-gold" : "text-gray-400"}`}
      />
    </button>
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="px-4 pb-4 text-gray-400">{item.answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
));

FAQItem.displayName = "FAQItem";

// Memoized Category Component
const CategorySection = memo(
  ({ category, categoryIndex, activeIndex, onToggle }) => (
    <div>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-rich-gold" />
        {category.category}
      </h3>
      <div className="space-y-4">
        {category.questions.map((item, questionIndex) => {
          const index = categoryIndex * 10 + questionIndex;
          return (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isActive={activeIndex === index}
              onToggle={onToggle}
            />
          );
        })}
      </div>
    </div>
  ),
);

CategorySection.displayName = "CategorySection";

const QnASection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = useCallback((index) => {
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
