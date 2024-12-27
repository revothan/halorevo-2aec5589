import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Users,
  Star,
  Award,
  Rocket,
  Target,
  Lightbulb,
  Zap,
  Clock,
} from "lucide-react";

const AboutUs = () => {
  const stats = [
    { label: "Projects Completed", value: "50+", icon: Rocket },
    { label: "Happy Clients", value: "30+", icon: Users },
    { label: "Years Experience", value: "5+", icon: Clock },
  ];

  const values = [
    {
      icon: Target,
      title: "Client-Focused",
      description:
        "Your success is our priority. We work closely with you to understand and achieve your goals.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We stay ahead of technological trends to provide cutting-edge solutions.",
    },
    {
      icon: Star,
      title: "Excellence",
      description:
        "We deliver exceptional quality through attention to detail and continuous improvement.",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-rich-blue/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-rich-gold/10 rounded-full blur-3xl"
        />
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
            <Zap className="w-4 h-4 text-rich-blue" />
            <span className="text-sm font-mono text-rich-blue">Our Story</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Transforming Ideas into{" "}
            <span className="text-rich-gold">Digital Reality</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            We're a team of passionate developers and designers dedicated to
            crafting exceptional digital experiences that help businesses thrive
            in the modern world.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-rich-blue to-rich-gold opacity-30 blur-xl rounded-xl" />
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://ucarecdn.com/77c3b2c2-98f4-4b50-a36d-2b0a4e930635/-/preview/1000x565/"
                  alt="Our Team at Work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 to-transparent" />
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 w-[90%]">
              <div className="bg-rich-gray/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="grid grid-cols-3 gap-4">
                  {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="w-5 h-5 text-rich-gold" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {value}
                      </div>
                      <div className="text-xs text-gray-400">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Who We Are</h3>
              <p className="text-gray-400">
                Based in Vancouver, we specialize in creating custom web
                solutions and automation tools that help businesses streamline
                their operations and enhance their digital presence. With over 5
                years of experience, we've helped numerous businesses achieve
                their digital goals.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-400">
                We're on a mission to make advanced technology accessible to
                businesses of all sizes. Through our productized services, we
                provide enterprise-level solutions with the flexibility and
                affordability that modern businesses need.
              </p>
            </div>

            <div className="pt-4">
              <div className="grid gap-6">
                {values.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-rich-blue/10 border border-rich-blue/20">
                      <Icon className="w-5 h-5 text-rich-blue" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {title}
                      </h4>
                      <p className="text-gray-400">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Our Technology Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            {[
              "React",
              "Next.js",
              "Node.js",
              "Python",
              "AWS",
              "MongoDB",
              "PostgreSQL",
              "TypeScript",
            ].map((tech) => (
              <div
                key={tech}
                className="px-6 py-3 rounded-lg bg-rich-gray/30 border border-white/10 backdrop-blur-sm"
              >
                <span className="text-gray-300">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
