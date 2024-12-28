import { BlogList } from "@/components/blog/BlogList";

const Blog = () => {
  return (
    <div className="min-h-screen bg-rich-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
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
  );
};

export default Blog;