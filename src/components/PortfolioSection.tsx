import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Code,
  Laptop,
  Smartphone,
  Brain,
  Terminal,
  ExternalLink,
  Github,
  Layout,
  Sparkles,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "all", label: "All Projects", icon: Layout },
    { id: "web", label: "Web Development", icon: Code },
    { id: "mobile", label: "Mobile Apps", icon: Smartphone },
    { id: "ai", label: "AI Solutions", icon: Brain },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management",
      category: "web",
      image: "/api/placeholder/600/400",
      technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: 2,
      title: "AI-Powered Assistant",
      description: "Natural language processing bot for customer service",
      category: "ai",
      image: "/api/placeholder/600/400",
      technologies: ["Python", "TensorFlow", "FastAPI", "React"],
      featured: true,
    },
    // Add more projects as needed
  ];

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.getElementsByClassName("project-card");
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-rich-black to-rich-gray py-20 px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(66,138,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(255,182,66,0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-rich-gold">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore my latest work across web development, mobile
              applications, and AI solutions. Each project represents a unique
              challenge solved with modern technology.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                onClick={() => setSelectedCategory(id)}
                className={`
                  px-6 py-3 rounded-lg flex items-center gap-2 transition-all
                  ${
                    selectedCategory === id
                      ? "bg-rich-gold text-rich-black"
                      : "bg-rich-gray/30 text-gray-300 hover:bg-rich-gray/50"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="project-card relative group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-rich-blue via-rich-gold to-rich-blue opacity-75"
                    style={{
                      maskImage:
                        "radial-gradient(circle at var(--mouse-x) var(--mouse-y), transparent 20%, black 80%)",
                    }}
                  />
                </div>

                <div className="relative bg-rich-gray/30 backdrop-blur-sm rounded-xl p-6 h-full border border-white/10 overflow-hidden">
                  {/* Project Image */}
                  <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 to-transparent" />
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-rich-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 rounded-full bg-rich-blue/20 text-rich-blue"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4 pt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-rich-gold hover:text-rich-gold/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-rich-gold hover:text-rich-gold/80 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-rich-gold/20 text-rich-gold px-3 py-1 rounded-full text-xs">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
