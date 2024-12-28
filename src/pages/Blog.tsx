import { BlogList } from "@/components/blog/BlogList";
import { Minus, Square, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Blog = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-rich-black min-h-screen p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto glass-card overflow-hidden border border-rich-gray/30">
        {/* Window Controls */}
        <div className="flex items-center justify-between bg-rich-gray px-4 py-2 border-b border-rich-gray/30">
          <div className="text-sm text-rich-gold/70 font-mono">
            halo-revo-blog.exe
          </div>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" className="text-rich-gold/70 hover:text-rich-gold">
                Home
              </Button>
            </Link>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-rich-gray/50 rounded">
                <Minus className="w-4 h-4 text-rich-gold/70" />
              </button>
              <button className="p-1 hover:bg-rich-gray/50 rounded">
                <Square className="w-4 h-4 text-rich-gold/70" />
              </button>
              <button className="p-1 hover:bg-rich-gray/50 rounded">
                <X className="w-4 h-4 text-rich-gold/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          <div className="p-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient animate-fade-up">
                Our Blog
              </h1>
              <p className="text-rich-gold/70 text-lg max-w-2xl mx-auto animate-fade-up [animation-delay:200ms]">
                Discover insights, tutorials, and updates from our team
              </p>
            </div>
            <div className="animate-fade-up [animation-delay:400ms]">
              <BlogList />
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Blog;