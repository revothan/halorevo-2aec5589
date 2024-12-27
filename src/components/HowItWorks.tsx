import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Lightbulb,
  Code,
  Rocket,
  MessageSquare,
  Zap,
  CheckCircle,
  Activity,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define step type for better type safety
interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  features: string[];
  stats: {
    label: string;
    value: string;
  };
}

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { scrollY } = useScroll();

  const steps: Step[] = [
    {
      id: 1,
      title: "Discovery & Planning",
      description:
        "We start with a deep dive into your business needs and objectives, creating a comprehensive roadmap for success.",
      icon: Lightbulb,
      color: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/20",
      features: [
        "Business Analysis",
        "Technical Requirements",
        "Project Timeline",
        "Budget Planning",
      ],
      stats: {
        label: "Average Planning Phase",
        value: "1 Day",
      },
    },
    {
      id: 2,
      title: "Design & Development",
      description:
        "Our expert team brings your vision to life with cutting-edge technology and pixel-perfect design.",
      icon: Code,
      color: "from-purple-500/20 to-purple-600/20",
      borderColor: "border-purple-500/20",
      features: [
        "UI/UX Design",
        "Frontend Development",
        "Backend Architecture",
        "Quality Assurance",
      ],
      stats: {
        label: "Development Sprints",
        value: "3-7 Days",
      },
    },
    {
      id: 3,
      title: "Launch & Growth",
      description:
        "We ensure a smooth deployment and provide ongoing support to help your business thrive.",
      icon: Rocket,
      color: "from-green-500/20 to-green-600/20",
      borderColor: "border-green-500/20",
      features: [
        "Deployment Strategy",
        "Performance Monitoring",
        "User Training",
        "Ongoing Support",
      ],
      stats: {
        label: "Launch Preparation",
        value: "5 Days",
      },
    },
  ];

  // Parallax effect for background elements
  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Auto-advance steps on desktop only
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [steps.length]);

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start">
      {/* Left Column - Steps Navigation */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = activeStep === index;

          return (
            <motion.div
              key={step.id}
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.95,
                opacity: isActive ? 1 : 0.7,
              }}
              onClick={() => setActiveStep(index)}
              className={`
                relative p-6 rounded-xl cursor-pointer
                transition-colors duration-300
                ${isActive ? "bg-rich-gray/30 backdrop-blur-sm" : "hover:bg-rich-gray/20"}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="border"
                  className="absolute inset-0 rounded-xl border border-rich-gold/30"
                  transition={{ duration: 0.3 }}
                />
              )}

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className={`
                  p-3 rounded-lg bg-gradient-to-br ${step.color}
                  border ${step.borderColor}
                `}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>

                {isActive && (
                  <div className="text-rich-gold">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right Column - Active Step Details */}
      {steps[activeStep] && <StepDetails step={steps[activeStep]} />}
    </div>
  );

  // Mobile Layout
  const MobileLayout = () => (
    <div className="lg:hidden space-y-6">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = activeStep === index;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-rich-gray/30 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
          >
            {/* Step Header */}
            <div
              onClick={() => setActiveStep(isActive ? -1 : index)}
              className={`
                relative p-6 cursor-pointer
                transition-colors duration-300
                ${isActive ? "bg-rich-gray/50" : "hover:bg-rich-gray/40"}
              `}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`
                  p-3 rounded-lg bg-gradient-to-br ${step.color}
                  border ${step.borderColor}
                `}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>

                <motion.div
                  animate={{ rotate: isActive ? 180 : 0 }}
                  className="text-rich-gold"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>
            </div>

            {/* Step Details */}
            <motion.div
              initial={false}
              animate={{
                height: isActive ? "auto" : 0,
                opacity: isActive ? 1 : 0,
              }}
              className="overflow-hidden"
            >
              {isActive && <StepDetails step={step} />}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );

  // Reusable Step Details Component
  const StepDetails = ({ step }: { step: Step }) => (
    <div className="p-6 space-y-6">
      {/* Statistics */}
      <div className="p-4 bg-rich-black/30 rounded-lg">
        <div className="text-sm text-gray-400">{step.stats.label}</div>
        <div className="text-2xl font-bold text-rich-gold">
          {step.stats.value}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white mb-4">
          What's Included:
        </h4>
        {step.features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-rich-gold" />
            <span className="text-gray-300">{feature}</span>
          </motion.div>
        ))}
      </div>

      {/* Activity Indicator */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Activity className="w-4 h-4" />
          <span>Active Development Phase</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-0 right-0 w-96 h-96 bg-rich-blue/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-rich-gold/5 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-rich-blue/10 px-4 py-2 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-rich-blue" />
            <span className="text-sm font-mono text-rich-blue">
              Our Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            How We Bring Your{" "}
            <span className="text-rich-gold">Vision to Life</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Our proven process ensures your project is delivered on time, within
            budget, and exceeds expectations.
          </motion.p>
        </div>

        {/* Responsive Layouts */}
        <DesktopLayout />
        <MobileLayout />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <Button className="bg-rich-gold hover:bg-rich-gold/90 text-rich-black px-8 py-6 rounded-lg font-medium inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Start Your Project
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
