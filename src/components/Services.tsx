import {
  Code,
  Laptop,
  Zap,
  ShoppingCart,
  DollarSign,
  CalendarCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Laptop,
    title: "Small Business Website Development",
    description:
      "Custom-built, responsive websites specifically designed for small Canadian businesses, featuring SEO optimization, mobile-friendly design, and easy content management.",
    link: "/services/website-development",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Solutions for Small Businesses",
    description:
      "Transform your small business with powerful online stores that handle inventory, payments, and shipping with ease. Affordable solutions for Vancouver entrepreneurs.",
    link: "/services/ecommerce",
  },
  {
    icon: Zap,
    title: "Business Automation Services",
    description:
      "Streamline your small business operations with custom automation tools that save time and reduce manual work. Perfect for growing Canadian businesses.",
    link: "/services/automation",
  },
  {
    icon: DollarSign,
    title: "Affordable Website Packages",
    description:
      "Budget-friendly website solutions specifically designed for Canadian small businesses. No hidden fees, just transparent pricing and exceptional quality.",
    link: "/services/pricing",
  },
  {
    icon: Code,
    title: "Custom Web Applications",
    description:
      "Tailored web applications that solve specific challenges for your small business. From booking systems to customer portals, we build solutions that grow with you.",
    link: "/services/custom-development",
  },
  {
    icon: CalendarCheck,
    title: "Free Website Consultation",
    description:
      "Meet us in Vancouver for a no-obligation discussion about your small business website needs. We'll provide honest advice and solutions that fit your budget.",
    link: "/free-trial",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 px-4 bg-rich-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="glass-card p-4 mb-8 inline-block">
            <div className="flex items-center gap-2 text-rich-yellow font-mono">
              <Code className="w-5 h-5" />
              <span>Vancouver Small Business Web Solutions</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Our <span className="text-gradient">Small Business Services</span>
          </h2>
          <p className="text-rich-gold/80 max-w-2xl mx-auto font-mono">
            {">"} Professional web development solutions designed specifically
            for Canadian small businesses at affordable prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 transition-all duration-300 hover:translate-y-[-4px] group"
            >
              <div className="w-12 h-12 rounded-lg bg-rich-gray/30 flex items-center justify-center mb-4 group-hover:bg-rich-gray/50 transition-colors">
                <service.icon className="w-6 h-6 text-rich-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono text-rich-purple">
                {service.title}
              </h3>
              <p className="text-rich-gold/80 font-mono mb-4">
                {service.description}
              </p>
              <Link to={service.link}>
                <Button
                  variant="outline"
                  className="w-full border-rich-gold/30 hover:bg-rich-gold/10 text-rich-gold"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Added Call-to-Action for improved conversion */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to transform your small business website?
          </h3>
          <p className="text-rich-gold/80 max-w-2xl mx-auto mb-8">
            Schedule a free consultation with our Vancouver team today and
            discover how we can help your small business succeed online.
          </p>
          <Link to="/free-trial">
            <Button className="bg-rich-gold hover:bg-rich-gold/90 text-black px-8 py-4">
              Book Your Free Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

