
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight, Plus, Tag, Search } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  created_at: string;
  slug: string;
  categories: {
    name: string;
    id: string;
  };
}

// Helper function to sanitize slugs for URLs
const sanitizeSlug = (slug) => {
  if (!slug) return "";
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

export function BlogList() {
  const { session } = useSessionContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Get user profile to check if admin
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

  // Fetch all categories for filter
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  // Fetch all published posts
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", searchQuery, categoryFilter],
    queryFn: async () => {
      let query = supabase
        .from("posts")
        .select(
          `
          id,
          title,
          excerpt,
          featured_image,
          published_at,
          created_at,
          slug,
          categories:category_id (
            id,
            name
          )
        `,
        )
        .eq("published", true)
        .order("created_at", { ascending: false });

      // Apply category filter if selected
      if (categoryFilter !== "all") {
        query = query.eq("category_id", categoryFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Apply search filter client-side
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        return (data as Post[]).filter(
          (post) =>
            post.title.toLowerCase().includes(lowerQuery) ||
            (post.excerpt && post.excerpt.toLowerCase().includes(lowerQuery)),
        );
      }

      return data as Post[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rich-gold"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load blog articles</p>
      </div>
    );
  }

  const formatPostDate = (post: Post) => {
    const dateString = post.published_at || post.created_at;
    if (!dateString) return "";
    const date = parseISO(dateString);
    return format(date, "MMMM d, yyyy");
  };

  // Always use post ID for URLs instead of slugs to avoid 400 errors with long slugs
  const getPostUrl = (post: Post) => {
    return `/blog/${post.id}`;
  };

  // No results message
  const renderNoResults = () => (
    <div className="text-center py-16 bg-rich-gray/20 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">No articles found</h3>
      <p className="text-rich-gold/70 mb-4">
        {searchQuery
          ? `No articles match your search for "${searchQuery}"`
          : categoryFilter !== "all"
            ? "No articles in this category yet"
            : "We haven't published any articles yet"}
      </p>
      <Button
        variant="outline"
        onClick={() => {
          setSearchQuery("");
          setCategoryFilter("all");
        }}
      >
        Clear filters
      </Button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* SEO Metadata */}
      <Helmet>
        <title>Small Business Website Tips & Resources | HaloRevo Blog</title>
        <meta
          name="description"
          content="Explore expert advice, tips, and strategies for effective small business websites. Learn how Indonesian businesses succeed online."
        />
        <meta
          name="keywords"
          content="small business website tips, indonesia web development blog, small business website indonesia, small business web design"
        />
        <meta
          property="og:title"
          content="Small Business Website Tips & Resources | HaloRevo Blog"
        />
        <meta
          property="og:description"
          content="Expert advice for small business websites and strategies for online success"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://halorevo.com/blog" />
        <link rel="canonical" href="https://halorevo.com/blog" />
      </Helmet>

      {/* Admin New Post Button */}
      {profile?.is_admin && (
        <div className="flex justify-end">
          <Link to="/admin/blog/new">
            <Button variant="secondary" className="group">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>
      )}

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-rich-gray/20 rounded-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Featured Article */}
      {posts?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <Link to={getPostUrl(posts[0])}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-rich-gray/20 border-rich-gray/30">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  {posts[0].featured_image ? (
                    <img
                      src={posts[0].featured_image}
                      alt={posts[0].title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="bg-rich-purple/20 w-full h-full flex items-center justify-center">
                      <span className="text-rich-purple">HaloRevo Blog</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {posts[0].categories?.name && (
                    <span className="inline-flex items-center bg-rich-purple/20 text-rich-purple px-3 py-1 rounded-full text-sm mb-4">
                      <Tag className="w-3 h-3 mr-1.5" />
                      {posts[0].categories.name}
                    </span>
                  )}
                  <h3 className="text-2xl font-bold text-rich-gold mb-4">
                    {posts[0].title}
                  </h3>
                  <p className="text-rich-gold/80 mb-4 line-clamp-3">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center text-rich-gold/70 mb-6">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {formatPostDate(posts[0])}
                  </div>
                  <Button className="bg-rich-purple hover:bg-rich-purple/90 group">
                    Read Full Article
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}

      {/* Main Blog Grid */}
      {posts?.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map((post) => (
              <Card
                key={post.id}
                className="glass-card hover:scale-[1.02] transition-transform duration-200 h-full flex flex-col"
              >
                {post.featured_image && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                    {post.categories?.name && (
                      <div className="absolute top-2 right-2">
                        <span className="inline-flex items-center bg-rich-purple/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                          {post.categories.name}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl text-rich-gold">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-rich-gold/70">
                    <CalendarDays className="w-4 h-4" />
                    {formatPostDate(post)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-rich-gold/90 line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Link to={getPostUrl(post)} className="w-full">
                    <Button variant="secondary" className="w-full group">
                      Read More
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        renderNoResults()
      )}

      {/* Small Business Call-to-Action */}
      <div className="mt-16 p-6 bg-rich-purple/10 rounded-lg border border-rich-purple/20 text-center">
        <h3 className="text-2xl font-semibold mb-2">
          Need help with your small business website?
        </h3>
        <p className="mb-6 text-rich-gold/80 max-w-2xl mx-auto">
          Our team in Indonesia specializes in creating professional and affordable 
          websites for small businesses. Schedule a free consultation today!
        </p>
        <Link to="/free-trial">
          <Button className="bg-rich-purple hover:bg-rich-purple/90 px-8 py-3">
            Book Your Free Consultation
          </Button>
        </Link>
      </div>

      {/* Structured Data for BlogPosting */}
      {posts && posts.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: "Small Business Website Tips & Resources | HaloRevo Blog",
            description:
              "Expert advice for small business websites and strategies for online success",
            url: "https://halorevo.com/blog",
            publisher: {
              "@type": "Organization",
              name: "HaloRevo",
              logo: {
                "@type": "ImageObject",
                url: "https://halorevo.com/logo.png",
              },
            },
            blogPost: posts.slice(0, 10).map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              url: `https://halorevo.com/blog/${post.id}`,
              datePublished: post.published_at || post.created_at,
              image: post.featured_image,
              description: post.excerpt,
              keywords: [
                "small business website",
                "indonesia small business web development",
                post.categories?.name,
              ].filter(Boolean),
            })),
          })}
        </script>
      )}
    </div>
  );
}
