import { motion } from "framer-motion";
import { FAQItemProps } from "@/types";

export const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="bg-rich-gray/20 p-6 rounded-lg"
  >
    <h3 className="text-xl font-semibold text-white mb-2">{question}</h3>
    <p className="text-gray-300">{answer}</p>
  </motion.div>
);

export const FAQSection: React.FC = () => (
  <div className="py-16 px-4 bg-rich-gray/10">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        <FAQItem
          question="What's the difference between one-time and subscription plans?"
          answer="One-time development is perfect if you need a new website built from scratch. Our subscription plans (Basic & Pro) offer unlimited ongoing development, perfect for businesses that need regular updates and continuous improvements."
        />
        <FAQItem
          question="What's included in a website redesign request?"
          answer="Each request can include layout changes, content updates, new features, or style modifications. We handle everything from simple text updates to complete page redesigns."
        />
        <FAQItem
          question="Can I cancel my subscription anytime?"
          answer="Yes, you can cancel your subscription at any time with no questions asked. You'll continue to have access until the end of your billing period."
        />
      </div>
    </div>
  </div>
);
