import { Code, Laptop, Zap } from "lucide-react";

const services = [
  {
    icon: Laptop,
    title: "Website Creation",
    description:
      "Building responsive, user-friendly, and visually appealing websites that make your business stand out online.",
  },
  {
    icon: Zap,
    title: "Automation Services",
    description:
      "Streamlining your digital processes using cutting-edge automation tools to save time and reduce manual work.",
  },
  {
    icon: Code,
    title: "Custom Development",
    description:
      "Crafting tailored digital solutions that perfectly align with your business needs and goals.",
  },
];

export const Services = () => {
  return (
    <section className="py-24 px-4 bg-rich-black">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="glass-card p-4 mb-8 inline-block">
            <div className="flex items-center gap-2 text-rich-yellow font-mono">
              <Code className="w-5 h-5" />
              <span>$ list services</span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-rich-gold/80 max-w-2xl mx-auto font-mono">
            {'>'} Comprehensive digital solutions to help your business thrive in the modern world_
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-card p-6 transition-all duration-300 hover:translate-y-[-4px] group"
            >
              <div className="w-12 h-12 rounded-lg bg-rich-gray/30 flex items-center justify-center mb-4 group-hover:bg-rich-gray/50 transition-colors">
                <service.icon className="w-6 h-6 text-rich-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-mono text-rich-purple">{service.title}</h3>
              <p className="text-rich-gold/80 font-mono">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};