import React from "react";
import { motion } from "framer-motion";
import { Rocket, Users, Activity, MapPin, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const stats = [
    { value: "50+", label: "Small Business Websites Delivered", icon: Rocket },
    { value: "30+", label: "Happy Vancouver Clients", icon: Users },
    { value: "99%", label: "Client Satisfaction", icon: Activity },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section id="about-us" className="relative min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 overflow-hidden">
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
              About HaloRevo - Top Website Design Agency for Small Businesses
            </motion.p>

            <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold">
              Vancouver's Leading{" "}
              <span className="text-rich-gold">Small Business Web Agency</span>
            </motion.h2>

            <motion.p {...fadeInUp} className="text-gray-400 text-lg">
              Based in Vancouver, we're a dedicated team of web developers who specialize in 
              creating affordable, high-impact websites for small businesses across Canada. 
              We understand the unique challenges small business owners face and provide 
              tailored solutions that drive real results.
            </motion.p>

            <motion.div {...fadeInUp} className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rich-blue mt-1" />
                <div>
                  <h3 className="font-semibold">Local Vancouver Expertise</h3>
                  <p className="text-gray-400">
                    Meet us for a free consultation at Breka Cafe on Hastings. We love 
                    supporting local small businesses and understanding your unique needs.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-rich-blue mt-1" />
                <div>
                  <h3 className="font-semibold">Small Business Specialists</h3>
                  <p className="text-gray-400">
                    We focus exclusively on helping small Canadian businesses succeed online 
                    with affordable website packages designed for your budget.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-rich-blue mt-1" />
                <div>
                  <h3 className="font-semibold">Free Initial Consultation</h3>
                  <p className="text-gray-400">
                    Schedule a no-obligation meeting to discuss your small business website needs 
                    and see how we can help your business grow online.
                  </p>
                </div>
              </div>
            </motion.div>

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
            
            <motion.div {...fadeInUp}>
              <Link to="/free-trial">
                <Button className="bg-rich-gold hover:bg-rich-gold/90 text-black font-medium px-6 py-3">
                  Schedule Free Consultation
                </Button>
              </Link>
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
                alt="HaloRevo - Vancouver Small Business Web Development Team"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 via-transparent to-transparent" />
            </div>
            
            {/* Caption for SEO */}
            <div className="mt-4 text-center text-sm text-gray-400">
              HaloRevo team - Creating affordable websites for small businesses in Vancouver and across Canada
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
