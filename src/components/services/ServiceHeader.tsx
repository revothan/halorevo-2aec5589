import { motion } from "framer-motion";

export const ServiceHeader = () => {
  return (
    <section id="services" className="py-20 px-4 md:px-8 scroll-mt-20">
      <div className="text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-rich-gold"
        >
          Our Services
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-rich-gold/80"
        >
          Transforming your web presence with our professional and affordable
          services.
        </motion.p>
      </div>
    </section>
  );
};

