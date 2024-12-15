import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { TypingAnimation } from "./TypingAnimation";
import { useState } from "react";
import { Folder } from "./Folder";
import { FolderWindow } from "./FolderWindow";

interface HeroProps {
  showContent?: boolean;
}

export const Hero = ({ showContent = true }: HeroProps) => {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  const folders = [
    {
      title: "About Me",
      content: "Hi! I'm Halo Revo, a web developer passionate about creating amazing digital experiences.",
      position: "top-[15%] left-[15%]"
    },
    {
      title: "Let's Work Together",
      content: "Ready to start a project? Let's collaborate and bring your ideas to life!",
      position: "bottom-[35%] left-[45%]"
    },
    {
      title: "What Does Revo Offer?",
      content: "I offer web development, automation solutions, and digital transformation services.",
      position: "top-[15%] left-[35%]"
    },
    {
      title: "My Portfolio",
      content: "Check out some of my recent projects and success stories.",
      position: "top-[15%] right-[15%]"
    },
    {
      title: "Pricing",
      content: "Flexible pricing options tailored to your needs and budget.",
      position: "bottom-[15%] right-[15%]"
    }
  ];

  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden cursor-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAnSURBVHgBY2RgYPj/n+E/AxbACFPACFPEgAVgVYRLATZ5rArwuQQA+OgPOzQqoj4AAAAASUVORK5CYII='),auto]">
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black to-rich-gray opacity-50" />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="inline-block text-sm uppercase tracking-wider text-rich-blue animate-fade-up animate-delay-1 font-mono">
            {'>'} Digital Solutions for Modern Businesses_
          </span>
          
          {showContent && (
            <TypingAnimation
              texts={["Hey, Vancouver!", "This is Halo Revo."]}
              className="text-4xl md:text-6xl font-bold leading-tight"
            />
          )}
          
          <p className="text-lg md:text-xl text-rich-gold/80 animate-fade-up animate-delay-3 font-mono">
            Websites & Automations That Work for You
          </p>
        </div>

        {/* Scattered Folders */}
        <div className="absolute inset-0 pointer-events-none">
          {folders.map((folder, index) => (
            <div
              key={folder.title}
              className={`absolute ${folder.position} md:block pointer-events-auto`}
            >
              <Folder
                title={folder.title}
                onClick={() => setOpenFolder(folder.title)}
              />
            </div>
          ))}
        </div>

        {/* Folder Windows */}
        {folders.map((folder) => (
          <FolderWindow
            key={folder.title}
            title={folder.title}
            isOpen={openFolder === folder.title}
            onClose={() => setOpenFolder(null)}
          >
            <p className="text-rich-gold/90 font-mono">{folder.content}</p>
          </FolderWindow>
        ))}
      </div>
    </section>
  );
};