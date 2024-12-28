import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
  categories: {
    name: string;
  };
}

export function BlogList() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          excerpt,
          featured_image,
          published_at,
          categories:category_id (
            name
          )
        `)
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (error) throw error;
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
        <p className="text-red-500">Failed to load blog posts</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts?.map((post) => (
        <Card key={post.id} className="glass-card hover:scale-[1.02] transition-transform duration-200">
          {post.featured_image && (
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              <img
                src={post.featured_image}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <CardHeader>
            {post.categories?.name && (
              <span className="text-sm text-rich-purple">{post.categories.name}</span>
            )}
            <CardTitle className="text-xl text-rich-gold">{post.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-rich-gold/70">
              <CalendarDays className="w-4 h-4" />
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-rich-gold/90">{post.excerpt}</p>
          </CardContent>
          <CardFooter>
            <Link to={`/blog/${post.id}`} className="w-full">
              <Button variant="secondary" className="w-full group">
                Read More
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}