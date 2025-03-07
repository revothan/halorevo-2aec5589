import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Services", href: "/services" },
    { name: "Free Trial", href: "/free-trial" },
  ];

  const social = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-rich-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rich-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rich-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">HaloRevo</h2>
                <p className="text-gray-400">
                  Transforming businesses through innovative digital solutions
                  and automation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-rich-gold" />
                  <span>Vancouver, BC, Canada</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-rich-gold" />
                  <a
                    href="mailto:halorevo.info@gmail.com"
                    className="hover:text-rich-gold transition-colors"
                  >
                    halorevo.info@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                {social.map(({ name, icon: Icon, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="p-2 rounded-lg bg-rich-gray/30 border border-white/10 hover:border-rich-gold/50 hover:bg-rich-gray/50 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-gray-400 hover:text-rich-gold transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
              <nav className="grid grid-cols-2 gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-400 hover:text-rich-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-400 text-sm">
              © {currentYear} HaloRevo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
