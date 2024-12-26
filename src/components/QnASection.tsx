import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const QnASection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

  const handleQuestionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Flatten questions for mobile view
  const allQuestions = faqs.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      category: category.category,
      globalIndex: categoryIndex * 10 + questionIndex,
    })),
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-b from-rich-blue/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-t from-rich-gold/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-rich-blue/10 px-4 py-2 rounded-full mb-6"
          >
            <MessageSquare className="w-4 h-4 text-rich-blue" />
            <span className="text-sm font-mono text-rich-blue">FAQ</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Common <span className="text-rich-gold">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Find answers to frequently asked questions about our services,
            process, and technical details.
          </motion.p>
        </div>

        {/* Desktop View - Categorized Questions */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={category.category}>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-rich-gold" />
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const index = categoryIndex * 10 + questionIndex;
                  const isActive = activeIndex === index;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        rounded-xl backdrop-blur-sm border
                        ${
                          isActive
                            ? "bg-rich-gray/40 border-rich-gold/30"
                            : "bg-rich-gray/20 border-white/10"
                        }
                      `}
                    >
                      <button
                        onClick={() => handleQuestionClick(index)}
                        className="w-full text-left p-4 flex items-start justify-between gap-4"
                      >
                        <span
                          className={`font-medium ${isActive ? "text-rich-gold" : "text-white"}`}
                        >
                          {item.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex-shrink-0 mt-1 ${isActive ? "text-rich-gold" : "text-gray-400"}`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-gray-400">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View - Single Column */}
        <div className="lg:hidden space-y-4 max-w-xl mx-auto">
          {allQuestions.map((item) => {
            const isActive = activeIndex === item.globalIndex;

            return (
              <motion.div
                key={item.globalIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: item.globalIndex * 0.1 }}
                className={`
                  rounded-xl backdrop-blur-sm border
                  ${
                    isActive
                      ? "bg-rich-gray/40 border-rich-gold/30"
                      : "bg-rich-gray/20 border-white/10"
                  }
                `}
              >
                <button
                  onClick={() => handleQuestionClick(item.globalIndex)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-sm text-rich-gold font-mono">
                        {item.category}
                      </span>
                      <p
                        className={`font-medium ${isActive ? "text-rich-gold" : "text-white"}`}
                      >
                        {item.question}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex-shrink-0 mt-1 ${isActive ? "text-rich-gold" : "text-gray-400"}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-gray-400">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="text-gray-400 mb-8">
            Can't find the answer you're looking for? Let's talk about your
            specific needs.
          </p>
          <Button className="bg-rich-gold hover:bg-rich-gold/90 text-rich-black px-8 py-6 rounded-lg font-medium inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Contact Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default QnASection;
