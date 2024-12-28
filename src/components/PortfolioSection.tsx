import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const PortfolioSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management and seamless payment integration.",
      image: "/api/placeholder/600/400",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      featured: true,
    },
    {
      id: 2,
      title: "Menyapa",
      description:
        "Menyapa.Live empowers businesses to create customizable AI chatbot assistants, enhancing customer engagement and streamlining operations.",
      image:
        "https://shvnmdhamqajanusqfax.supabase.co/storage/v1/object/public/images/Optik%20LOOV.gif",
      featured: true,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 5000); // Change slide every 3.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(66,138,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,182,66,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-bold mb-6">
            Featured <span className="text-rich-gold">Work</span>
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="relative rounded-2xl overflow-hidden"
            >
              {/* Project Card */}
              <div className="relative h-[600px] border border-white/10 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rich-black/90 to-transparent" />

                <img
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  className="w-full h-full object-cover"
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {/* Project Title */}
                    <h3 className="text-4xl font-bold text-white mb-6">
                      {projects[currentIndex].title}
                    </h3>

                    {/* Project Description */}
                    <p className="text-gray-300 text-lg max-w-2xl mb-8 leading-relaxed">
                      {projects[currentIndex].description}
                    </p>
                  </motion.div>
                </div>

                {/* Featured Badge */}
                {projects[currentIndex].featured && (
                  <div className="absolute top-6 right-6 flex items-center gap-1 bg-rich-gold/20 text-rich-gold px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Featured Project
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {projects.map((_, index) => (
              <div
                key={index}
                className="relative h-1 w-16 rounded-full bg-white/10 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-rich-gold transition-transform duration-[3500ms] ease-linear origin-left
                    ${currentIndex === index ? "scale-x-100" : "scale-x-0"}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
