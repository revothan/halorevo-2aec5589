import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Sparkles,
  BarChart3,
  Clock,
  Check,
  Star,
  Users,
  Globe,
} from "lucide-react";

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device on first interaction
  const handleTouchStart = useCallback(() => {
    setIsTouchDevice(true);
    setIsDragging(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInteraction = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const newPosition = (x / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  }, []);

  // Handle mouse move without requiring drag on desktop
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isTouchDevice) {
      handleInteraction(e);
    }
  }, [handleInteraction, isTouchDevice]);

  // Handle touch move only when dragging
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging) {
      handleInteraction(e);
    }
  }, [isDragging, handleInteraction]);

  return (
    <div className="relative w-full max-w-screen-2xl mx-auto aspect-video bg-gray-800 touch-none">
      {/* Before Image */}
      <div className="absolute inset-0 bg-gray-800">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="https://shvnmdhamqajanusqfax.supabase.co/storage/v1/object/public/images/1.png"
            alt="Before"
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-rich-purple to-blue-600"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="https://shvnmdhamqajanusqfax.supabase.co/storage/v1/object/public/images/2.png"
            alt="After"
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
      </div>

      {/* Slider */}
      <div
        className="absolute inset-0 cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div
          className="absolute top-0 bottom-0 w-1 bg-white transition-transform duration-75"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            ⇄
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ name, role, company, content }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-rich-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rich-purple to-blue-600 flex items-center justify-center text-xl font-bold">
        {name[0]}
      </div>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-gray-400">
          {role} at {company}
        </p>
      </div>
    </div>
    <p className="text-gray-300">{content}</p>
    <div className="flex gap-1 mt-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-rich-purple text-rich-purple" />
      ))}
    </div>
  </motion.div>
);

export const FreeTrialLanding = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Modern Design",
      description:
        "Get a sleek, professional design that matches current web trends and best practices.",
    },
    {
      icon: Sparkles,
      title: "Better User Experience",
      description:
        "Improve your visitors' journey with intuitive navigation and clear call-to-actions.",
    },
    {
      icon: BarChart3,
      title: "Increased Conversions",
      description:
        "Transform more visitors into customers with optimized landing page layout.",
    },
    {
      icon: Clock,
      title: "Quick Turnaround",
      description:
        "Receive your redesign concept within 48 hours of submitting your information.",
    },
  ];

  const features = [
    "Custom design tailored to your brand",
    "Mobile-responsive layout",
    "Optimized for conversions",
    "Modern UI/UX practices",
    "Speed optimization suggestions",
    "Clear call-to-actions",
    "Professional typography",
    "Color scheme recommendations",
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Satisfied Clients" },
    { icon: Globe, value: "95%", label: "Conversion Rate Increase" },
    { icon: Clock, value: "48h", label: "Average Turnaround" },
    { icon: Star, value: "4.9/5", label: "Client Satisfaction" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechStart",
      content:
        "The redesign exceeded our expectations. Our conversion rate increased by 150% within the first month!",
    },
    {
      name: "Michael Chen",
      role: "Founder",
      company: "GrowthLabs",
      content:
        "The team delivered an incredible design that perfectly captured our brand's essence. Highly recommended!",
    },
    {
      name: "Emma Davis",
      role: "CEO",
      company: "Innovate AI",
      content:
        "The before/after difference was night and day. Our bounce rate dropped significantly after the redesign.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray relative">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />

      <div className="container mx-auto px-4 py-16 relative">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-rich-purple/20 px-4 py-2 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-rich-purple" />
            <span className="text-sm font-mono text-rich-purple">
              Limited Time Offer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold leading-tight"
          >
            Transform Your Website's
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rich-purple to-blue-600">
              First Impression
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            See the difference a professional redesign can make. Try our service
            risk-free with no commitment required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/free-trial/form">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rich-purple to-blue-600 hover:opacity-90 text-white px-8 py-4 rounded-lg font-medium cursor-pointer">
                Start Your Free Redesign
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Before/After Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <BeforeAfterSlider />
        </motion.div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map(({ icon: Icon, value, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2"
            >
              <Icon className="w-8 h-8 text-rich-purple mx-auto" />
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-gray-400">{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-rich-black/50 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-rich-purple/50 transition-colors"
            >
              <div className="p-3 bg-rich-purple/10 rounded-lg w-fit mb-4">
                <Icon className="w-6 h-6 text-rich-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </motion.div>
          ))}
        </div>

        {/* Features List */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-8"
          >
            What's Included in Your Free Redesign
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-3 bg-rich-black/30 p-4 rounded-lg hover:bg-rich-black/50 transition-colors"
              >
                <Check className="w-5 h-5 text-rich-purple shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-8"
          >
            What Our Clients Say
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-semibold">
              Ready to Transform Your Landing Page?
            </h2>
            <p className="text-gray-400">
              Join thousands of satisfied clients who have already transformed
              their online presence. No credit card required.
            </p>
            <Link to="/free-trial/form">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rich-purple to-blue-600 hover:opacity-90 text-white px-8 py-4 rounded-lg font-medium cursor-pointer">
                Get Started Now
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FreeTrialLanding;