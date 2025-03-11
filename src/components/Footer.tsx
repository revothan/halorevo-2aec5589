import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Clock, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const mainLinks = [
    { name: "Home", href: "/" },
    { name: "Small Business Websites", href: "/services" },
    { name: "Free Consultation", href: "/free-trial" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { name: "Vancouver Small Business Websites", href: "/services/website-development" },
    { name: "E-commerce for Small Businesses", href: "/services/ecommerce" },
    { name: "Business Automation", href: "/services/automation" },
    { name: "Website Maintenance", href: "/services/maintenance" },
    { name: "SEO for Canadian Small Businesses", href: "/services/seo" },
  ];

  const locationLinks = [
    { name: "Vancouver, BC", href: "/locations/vancouver" },
    { name: "Burnaby, BC", href: "/locations/burnaby" },
    { name: "Richmond, BC", href: "/locations/richmond" },
    { name: "Surrey, BC", href: "/locations/surrey" },
    { name: "All of Canada (Remote)", href: "/locations/canada" },
  ];

  const social = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/halorevo" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/halorevo" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/halorevo" },
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
          <div className="grid md:grid-cols-4 gap-8 items-start">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">HaloRevo</h2>
                <p className="text-gray-400">
                  Vancouver's leading web development agency for small businesses across Canada
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-rich-gold" />
                  <address className="not-italic">
                    <span>Breka Cafe Hastings</span><br />
                    <span>Vancouver, BC, Canada</span>
                  </address>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-rich-gold" />
                  <a
                    href="tel:+16041234567"
                    className="hover:text-rich-gold transition-colors"
                  >
                    (604) 123-4567
                  </a>
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
                <div className="flex items-start gap-3 text-gray-400">
                  <Clock className="w-5 h-5 text-rich-gold shrink-0 mt-1" />
                  <div>
                    <div>Monday - Friday: 9AM - 5PM</div>
                    <div>Weekends: By appointment</div>
                  </div>
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

            {/* Main Links */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
              <nav className="grid gap-3">
                {mainLinks.map((item) => (
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

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Our Services
              </h3>
              <nav className="grid gap-3">
                {serviceLinks.map((item) => (
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

            {/* Service Areas */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">
                Service Areas
              </h3>
              <nav className="grid gap-3">
                {locationLinks.map((item) => (
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
          
          {/* CTA Banner */}
          <div className="mt-16 p-6 rounded-lg bg-rich-gray/20 border border-rich-gray/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to transform your small business website?</h3>
                <p className="text-gray-400">Schedule your free consultation today and take the first step toward digital success.</p>
              </div>
              <Link to="/free-trial" className="bg-rich-gold hover:bg-rich-gold/90 text-black px-6 py-3 rounded-lg whitespace-nowrap">
                Free Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-center text-gray-400 text-sm mb-4 md:mb-0">
                © {currentYear} HaloRevo Web Development. All rights reserved. Vancouver's top small business website agency.
              </p>
              <div className="flex space-x-6">
                <Link to="/privacy-policy" className="text-gray-500 hover:text-rich-gold text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-500 hover:text-rich-gold text-sm">
                  Terms of Service
                </Link>
                <Link to="/sitemap" className="text-gray-500 hover:text-rich-gold text-sm">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Structured data for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebDesign",
              "name": "HaloRevo Web Development",
              "description": "Vancouver's leading web development agency for small businesses across Canada",
              "url": "https://halorevo.com",
              "telephone": "+16041234567",
              "email": "halorevo.info@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Breka Cafe Hastings",
                "addressLocality": "Vancouver",
                "addressRegion": "BC",
                "postalCode": "V6B 1G1",
                "addressCountry": "CA"
              },
              "priceRange": "$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://facebook.com/halorevo",
                "https://instagram.com/halorevo",
                "https://linkedin.com/company/halorevo"
              ],
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 49.2827,
                  "longitude": -123.1207
                },
                "geoRadius": "100km"
              },
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 49.2827,
                  "longitude": -123.1207
                },
                "geoRadius": "3000km" // All of Canada
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Small Business Website Development",
                    "description": "Custom website development for small businesses in Vancouver and across Canada"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce Solutions",
                    "description": "E-commerce website development for small Canadian businesses"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Free Website Consultation",
                    "description": "No-obligation website consultation for small business owners"
                  }
                }
              ]
            })
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
