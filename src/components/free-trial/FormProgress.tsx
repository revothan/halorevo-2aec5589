import { motion } from "framer-motion";

interface Step {
  id: string;
  title: string;
  description: string;
}

interface FormProgressProps {
  steps: Step[];
  currentStep: number;
}

export const FormProgress = ({ steps, currentStep }: FormProgressProps) => {
  return (
    <div className="flex justify-center mb-8">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              i <= currentStep
                ? "bg-rich-purple text-white"
                : "bg-rich-gray/30 text-rich-gold/50"
            }`}
          >
            {i + 1}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-16 h-0.5 ${
                i < currentStep ? "bg-rich-purple" : "bg-rich-gray/30"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};