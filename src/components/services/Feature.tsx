import { motion } from "framer-motion";
import { FeatureProps } from "@/types";

export const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
}) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="flex items-start space-x-4 bg-rich-gray/20 p-6 rounded-lg"
  >
    {icon}
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  </motion.div>
);
