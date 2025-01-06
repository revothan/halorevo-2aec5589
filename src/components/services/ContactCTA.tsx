import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ContactCTA = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-rich-gray/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-rich-gold mb-8">
          Have Questions? Let's Talk!
        </h2>
        <Button
          className="bg-rich-purple hover:bg-rich-purple/80"
          onClick={() => window.location.href = "/contact"}
        >
          <Mail className="mr-2" />
          Contact Us
        </Button>
      </div>
    </section>
  );
};