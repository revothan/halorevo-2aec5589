import React from "react";
import { motion } from "framer-motion";
import { Rocket, Users, Activity, ArrowRight } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { value: "50+", label: "Projects Delivered", icon: Rocket },
    { value: "30+", label: "Happy Clients", icon: Users },
    { value: "99%", label: "Client Satisfaction", icon: Activity },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-rich-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-rich-gold/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.p {...fadeInUp} className="text-rich-gold font-mono">
              About HaloRevo
            </motion.p>

            <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold">
              Crafting Digital{" "}
              <span className="text-rich-gold">Excellence</span>
            </motion.h2>

            <motion.p {...fadeInUp} className="text-gray-400 text-lg">
              Based in Vancouver, we're a dynamic team of digital craftsmen who
              transform ideas into powerful online experiences. With expertise
              in web development and business automation, we help companies
              thrive in the digital age.
            </motion.p>

            <motion.div {...fadeInUp} className="flex flex-wrap gap-8">
              {stats.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-rich-blue/10">
                    <Icon className="w-6 h-6 text-rich-blue" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-sm text-gray-400">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rich-blue/20 to-rich-gold/20 rounded-2xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src="https://ucarecdn.com/77c3b2c2-98f4-4b50-a36d-2b0a4e930635/-/preview/1000x565/"
                alt="HaloRevo Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
