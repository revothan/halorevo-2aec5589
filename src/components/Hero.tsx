import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { TypingAnimation } from "./TypingAnimation";
import { Folder } from "./Folder";
import { FolderWindow } from "./FolderWindow";
import { useState } from "react";

interface HeroProps {
  showContent?: boolean;
}

export const Hero = ({ showContent = true }: HeroProps) => {
  const [openFolder, setOpenFolder] = useState<string | null>(null);

  const folders = [
    { title: "About Me", position: { top: "45%", left: "15%" } },
    { title: "Let's Work Together", position: { top: "50%", left: "75%" } },
    { title: "What Does Revo Offer?", position: { top: "75%", left: "20%" } },
    { title: "My Portfolio", position: { top: "65%", left: "65%" } },
    { title: "Pricing", position: { top: "85%", left: "70%" } },
  ];

  const getFolderContent = (title: string) => {
    switch (title) {
      case "About Me":
        return "Hi! I'm Revo, a passionate developer...";
      case "Let's Work Together":
        return "Ready to start your next project?";
      case "What Does Revo Offer?":
        return "Web Development, Automation, and more...";
      case "My Portfolio":
        return "Check out my latest projects...";
      case "Pricing":
        return "Flexible pricing options for your needs...";
      default:
        return "Content coming soon...";
    }
  };

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
      </div>

      {/* Scattered Folders */}
      {folders.map((folder) => (
        <Folder
          key={folder.title}
          title={folder.title}
          position={folder.position}
          onClick={() => setOpenFolder(folder.title)}
        />
      ))}

      {/* Folder Windows */}
      <FolderWindow
        title={openFolder || ""}
        isOpen={!!openFolder}
        onClose={() => setOpenFolder(null)}
      >
        <p className="text-rich-gold/80 font-mono">
          {openFolder ? getFolderContent(openFolder) : ""}
        </p>
      </FolderWindow>
    </section>
  );
};