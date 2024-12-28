import { BlogList } from "@/components/blog/BlogList";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const Blog = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-rich-black min-h-screen p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto glass-card border border-rich-gray/30 min-h-[calc(100vh-4rem)] flex flex-col">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pt-36 pb-12 md:px-16 lg:px-24">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rich-gold to-rich-gold/70 bg-clip-text text-transparent text-left mb-4 md:mb-6">
                Our Blog
              </h1>
              <p className="text-rich-gold/70 text-base md:text-lg lg:text-xl max-w-3xl">
                Deep dive into our insights, tutorials, and the latest updates
                from our team. Explore articles crafted to enhance your
                knowledge and stay ahead in the field.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-5xl"
            >
              <BlogList />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Blog;