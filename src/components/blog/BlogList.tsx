import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronRight, Plus } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";

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
  const { session } = useSessionContext();

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

  const formatPostDate = (dateString: string | null) => {
    if (!dateString) return "";
    const date = parseISO(dateString);
    return format(date, "MMMM d, yyyy");
  };

  return (
    <div className="space-y-8">
      {profile?.is_admin && (
        <div className="flex justify-end">
          <Link to="/admin/blog/new">
            <Button variant="secondary" className="group">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
      )}

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
                {formatPostDate(post.published_at)}
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
    </div>
  );
}