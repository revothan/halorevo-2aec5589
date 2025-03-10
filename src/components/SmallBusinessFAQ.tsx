import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-rich-gray/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium">{question}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-rich-gold/80">{answer}</div>
      </div>
    </div>
  );
};

const SmallBusinessFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How much does a website cost for a small business in Canada?",
      answer: (
        <>
          <p>Our small business website packages start at $750/month with our Basic plan or a one-time fee of $2,000 for custom development. The exact cost depends on your specific requirements, but we pride ourselves on offering transparent, affordable pricing specifically designed for small businesses.</p>
          <p className="mt-2">We understand budget constraints for small businesses, which is why we offer flexible payment options and ensure you get maximum value for your investment.</p>
        </>
      ),
    },
    {
      question: "Why should I choose a Vancouver web development agency for my small business?",
      answer: (
        <>
          <p>Working with a local Vancouver web development agency like HaloRevo offers several advantages:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Face-to-face consultations to better understand your business</li>
            <li>Knowledge of the local Canadian market and business environment</li>
            <li>Faster response times and easier communication</li>
            <li>Support for the local Vancouver business community</li>
            <li>Ability to meet for regular updates and training</li>
          </ul>
        </>
      ),
    },
    {
      question: "How long does it take to build a website for a small business?",
      answer: 
        "Most small business websites take between 2-4 weeks to complete from start to finish. Our efficient process ensures you get a professional website quickly without sacrificing quality. For more urgent needs, we also offer expedited services to get your small business online faster.",
    },
    {
      question: "Do you offer free consultations for small businesses?",
      answer: 
        "Yes! We offer completely free, no-obligation consultations for small business owners in Vancouver. During this meeting, we'll discuss your goals, budget, and timeline to create a tailored plan for your website project. You can schedule a meeting at Breka Cafe on Hastings or opt for an online consultation.",
    },
    {
      question: "What's included in your small business website packages?",
      answer: (
        <>
          <p>Our small business website packages include everything you need to establish a professional online presence:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Professional, mobile-responsive design</li>
            <li>Content management system setup</li>
            <li>Basic SEO optimization</li>
            <li>Contact forms and Google Maps integration</li>
            <li>Social media links and sharing capabilities</li>
            <li>Website hosting and maintenance</li>
            <li>Basic website security</li>
            <li>Regular backups and updates</li>
          </ul>
          <p className="mt-2">Additional features like e-commerce functionality, membership portals, and advanced integrations are available as add-ons.</p>
        </>
      ),
    },
    {
      question: "Will my small business website work on mobile devices?",
      answer: 
        "Absolutely! All our small business websites are built with a mobile-first approach. This means your site will look and function perfectly on all devices - smartphones, tablets, laptops, and desktop computers. With over 60% of web traffic coming from mobile devices, we ensure your small business website provides an optimal experience for all visitors.",
    },
    {
      question: "Can you help my existing small business website rank better in Google?",
      answer: 
        "Yes, we offer SEO services specifically for small businesses in Canada. We'll analyze your current website, identify opportunities for improvement, and implement changes to help you rank higher in search results. Our localized SEO strategies focus on attracting customers in Vancouver and across Canada who are specifically looking for your products or services.",
    },
    {
      question: "Do you build e-commerce websites for small businesses?",
      answer: 
        "Yes! We specialize in creating affordable e-commerce solutions tailored to small Canadian businesses. Whether you're selling physical products, digital downloads, or services, we can build a secure, user-friendly online store that makes management and selling easy. Our e-commerce websites include inventory management, secure payment processing, and shipping integration.",
    },
    {
      question: "What makes HaloRevo different from other web design agencies?",
      answer: (
        <>
          <p>HaloRevo stands out as a web development agency because:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>We exclusively focus on small businesses and understand their unique challenges</li>
            <li>We offer local Vancouver service with in-person consultations</li>
            <li>Our pricing is transparent and specifically tailored to small business budgets</li>
            <li>We combine technical expertise with business strategy to drive real results</li>
            <li>We provide ongoing support and guidance, not just a one-time website</li>
            <li>Our proven track record of helping small businesses succeed online</li>
          </ul>
        </>
      ),
    },
    {
      question: "How do I get started with my small business website project?",
      answer: (
        <>
          <p>Getting started is easy! Here's the process:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>Schedule a free consultation (in Vancouver or online)</li>
            <li>Discuss your business needs, goals, and budget</li>
            <li>Receive a custom proposal tailored to your small business</li>
            <li>Once approved, we'll begin designing your website</li>
            <li>Review prototypes and provide feedback</li>
            <li>We implement changes and prepare for launch</li>
            <li>Your small business website goes live!</li>
          </ol>
          <p className="mt-2">Ready to get started? <Link to="/free-trial" className="text-rich-purple underline">Schedule your free consultation today</Link>.</p>
        </>
      ),
    },
  ];

  return (
    <section id="faq" className="py-20 bg-rich-black">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-rich-purple/10 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-4 h-4 text-rich-purple" />
            <span className="text-sm font-mono text-rich-purple">
              Small Business Website FAQ
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-rich-gold/80 max-w-2xl mx-auto">
            Common questions about small business website development in Vancouver and across Canada
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto bg-rich-gray/10 backdrop-blur-sm rounded-lg p-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-semibold mb-4">Still have questions about your small business website?</h3>
          <p className="text-rich-gold/80 max-w-2xl mx-auto mb-8">
            Contact us today or schedule a free consultation to discuss your specific small business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="outline" className="border-rich-gold/30 text-rich-gold hover:bg-rich-gold/10">
                Contact Us
              </Button>
            </Link>
            <Link to="/free-trial">
              <Button className="bg-rich-gold hover:bg-rich-gold/90 text-black">
                Schedule Free Consultation
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Schema.org FAQ structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": typeof faq.answer === 'string' 
                  ? faq.answer 
                  : React.Children.toArray(faq.answer.props.children)
                      .filter(child => typeof child === 'string' || (child.props && child.props.children))
                      .map(child => typeof child === 'string' ? child : child.props.children)
                      .join(' ')
              }
            }))
          })
        }} />
      </div>
    </section>
  );
};

export default SmallBusinessFAQ;
