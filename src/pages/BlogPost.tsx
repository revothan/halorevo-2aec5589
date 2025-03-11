import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, Clock, Tag, User } from "lucide-react";
import { format } from "date-fns";
import { useSessionContext } from "@supabase/auth-helpers-react";
import ReactMarkdown from "react-markdown";
import { Helmet } from "react-helmet";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { id } = useParams();
  const { session } = useSessionContext();

  // Track page view for analytics
  useEffect(() => {
    if (id) {
      console.log(`Blog view: ${id}`);
    }
  }, [id]);

  const { data: profile } = useQuery({
    queryKey: ["profile", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return null;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      return data;
    },
    enabled: !!session?.user?.id,
  });

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) throw new Error("Post ID is required");

      try {
        // Fetch post data first with a simpler query structure
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        // If category_id exists, fetch category data separately
        let categoryData = null;
        if (data.category_id) {
          try {
            const { data: catData, error: catError } = await supabase
              .from("categories")
              .select("name")
              .eq("id", data.category_id)
              .maybeSingle(); // Use maybeSingle to handle missing categories without error

            if (catError) {
              console.error("Error fetching category:", catError);
              // Continue without throwing an error so the rest of the page can load
            } else {
              categoryData = catData;
            }
          } catch (categoryErr) {
            console.error("Exception in category fetch:", categoryErr);
            // Continue without throwing so the page can still render
          }
        }

        // If author_id exists, fetch author data separately
        let authorData = null;
        if (data.author_id) {
          try {
            // Check if the problem is with the query structure
            const { data: authData, error: authError } = await supabase
              .from("profiles")
              .select("name, title, avatar_url")
              .eq("id", data.author_id)
              .maybeSingle(); // Use maybeSingle to handle missing profiles without error

            if (authError) {
              console.error("Error fetching author profile:", authError);
              // Continue without throwing an error so the rest of the page can load
            } else {
              authorData = authData;
            }
          } catch (profileErr) {
            console.error("Exception in profile fetch:", profileErr);
            // Continue without throwing so the page can still render
          }
        }

        // Combine the data
        return {
          ...data,
          categories: categoryData,
          author: authorData,
        };
      } catch (err) {
        console.error("Error in post query:", err);
        throw err;
      }
    },
    enabled: !!id, // Only run the query if we have an ID
    retry: 1, // Limit retries on failure
  });

  // Rest of the component remains the same
  const renderStructuredData = () => {
    if (!post) return null;

    const articleData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: post.featured_image,
      datePublished: post.published_at || post.created_at,
      dateModified: post.updated_at,
      author: {
        "@type": "Person",
        name: post.author?.name || "HaloRevo Team",
      },
      publisher: {
        "@type": "Organization",
        name: "HaloRevo",
        logo: {
          "@type": "ImageObject",
          url: "https://halorevo.com/logo.png",
        },
      },
      description: post.excerpt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://halorevo.com/blog/posts/${post.id}`,
      },
      keywords: [
        "small business website",
        "canada web development",
        "canada small business website",
        post.categories?.name,
      ].filter(Boolean),
    };

    return JSON.stringify(articleData);
  };

  const estimateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s+/).length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rich-black p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rich-gold"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-rich-black p-4 md:p-8">
        <Navbar />
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-2xl text-rich-gold mb-4">Article Not Found</h1>
          <p className="text-rich-gold/70 mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/blog">
            <Button variant="secondary">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Estimated reading time
  const readingTime = estimateReadingTime(post.content);

  // Format the post date
  const formattedDate = format(
    new Date(post.published_at || post.created_at),
    "MMMM d, yyyy",
  );

  return (
    <div className="min-h-screen bg-rich-black p-4 md:p-8">
      <Navbar />

      {/* SEO Metadata */}
      <Helmet>
        <title>
          {post.title} | HaloRevo - Web Development for Small Businesses
        </title>
        <meta name="description" content={post.excerpt} />
        <meta
          name="keywords"
          content={`small business website, web development canada , ${post.categories?.name}`}
        />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featured_image} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://halorevo.com/blog/${post.id}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={`https://halorevo.com/blog/${post.id}`} />
        <script type="application/ld+json">{renderStructuredData()}</script>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/blog">
            <Button variant="ghost" className="text-rich-gold">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          {profile?.is_admin && (
            <Link to={`/admin/blog/edit/${post.id}`}>
              <Button variant="secondary">Edit Article</Button>
            </Link>
          )}
        </div>

        <article className="glass-card p-8">
          {/* Category Tag */}
          {post.categories?.name && (
            <div className="mb-4">
              <span className="inline-flex items-center bg-rich-purple/20 text-rich-purple px-3 py-1 rounded-full text-sm">
                <Tag className="w-3 h-3 mr-1.5" />
                {post.categories.name}
              </span>
            </div>
          )}

          {/* Featured Image */}
          {post.featured_image && (
            <div className="relative h-[400px] -mx-8 -mt-8 mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="object-cover w-full h-full rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rich-black/80 rounded-t-lg"></div>
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl font-bold text-rich-gold mb-4">
              {post.title}
            </h1>

            {/* Author and Meta Information */}
            <div className="flex flex-wrap gap-4 text-rich-gold/70 mb-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author?.name || "HaloRevo Team"}
              </div>
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {readingTime} minute read
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-xl text-rich-gold/80 border-l-4 border-rich-purple/40 pl-4 italic">
                {post.excerpt}
              </div>
            )}
          </header>

          {/* Table of Contents - Auto-generated from H2s in content */}
          <div className="bg-rich-gray/20 p-4 rounded-lg mb-8">
            <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
            <div className="space-y-1">
              {post.content
                .split("\n")
                .filter((line) => line.startsWith("## "))
                .map((heading, index) => {
                  const text = heading.replace("## ", "");
                  const anchor = text
                    .toLowerCase()
                    .replace(/[^\w\s]/g, "")
                    .replace(/\s+/g, "-");
                  return (
                    <a
                      key={index}
                      href={`#${anchor}`}
                      className="block text-rich-gold/70 hover:text-rich-gold transition-colors"
                    >
                      {text}
                    </a>
                  );
                })}
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-invert prose-headings:text-rich-gold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-rich-gold/90 prose-a:text-rich-purple hover:prose-a:text-rich-purple/80 prose-strong:text-rich-gold prose-ul:text-rich-gold/90 prose-ol:text-rich-gold/90 prose-li:marker:text-rich-purple max-w-none">
            <ReactMarkdown
              components={{
                h2: ({ node, ...props }) => {
                  const id = props.children
                    .toString()
                    .toLowerCase()
                    .replace(/[^\w\s]/g, "")
                    .replace(/\s+/g, "-");
                  return <h2 id={id} {...props} />;
                },
                a: ({ node, ...props }) => (
                  <a target="_blank" rel="noopener noreferrer" {...props} />
                ),
                img: ({ node, ...props }) => (
                  <div className="my-8">
                    <img className="rounded-lg w-full" {...props} />
                    {props.alt && (
                      <p className="text-center text-sm text-rich-gold/60 mt-2">
                        {props.alt}
                      </p>
                    )}
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Call To Action */}
          <div className="mt-12 p-6 bg-rich-purple/10 rounded-lg border border-rich-purple/20">
            <h3 className="text-xl font-semibold mb-2">
              Need help with your small business website?
            </h3>
            <p className="mb-4 text-rich-gold/80">
              Our expert web development team in Canada specializes in creating
              professional websites for small businesses. Schedule a free
              consultation today!
            </p>
            <Link to="/free-trial">
              <Button className="bg-rich-purple hover:bg-rich-purple/90">
                Book Your Free Consultation
              </Button>
            </Link>
          </div>
        </article>
      </div>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
