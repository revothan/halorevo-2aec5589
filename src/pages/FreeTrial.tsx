import { FormHeader } from "@/components/free-trial/FormHeader";
import { FormProgress } from "@/components/free-trial/FormProgress";
import { FreeTrialForm } from "@/components/free-trial/FreeTrialForm";
import { FeaturesGrid } from "@/components/free-trial/FeaturesGrid";

const steps = [
  {
    id: "signup",
    title: "Create Your Account",
    description: "Start your journey to a better website",
  },
  {
    id: "website",
    title: "Current Website Details",
    description: "Tell us about your existing website",
  },
  {
    id: "business",
    title: "Business Information",
    description: "Help us understand your business better",
  },
];

const FreeTrial = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray relative p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <div className="container mx-auto max-w-6xl relative">
        <FormHeader />
        <FormProgress steps={steps} currentStep={0} />
        <FreeTrialForm />
        <FeaturesGrid />
      </div>
    </div>
  );
};

export default FreeTrial;