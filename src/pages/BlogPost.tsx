import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { useSessionContext } from "@supabase/auth-helpers-react";

const BlogPost = () => {
  const { id } = useParams();
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

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          categories:category_id (
            name
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rich-black p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rich-gold"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-rich-black p-4 md:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-rich-gold mb-4">Post not found</h1>
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

  return (
    <div className="min-h-screen bg-rich-black p-4 md:p-8">
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
              <Button variant="secondary">Edit Post</Button>
            </Link>
          )}
        </div>

        <article className="glass-card p-8">
          {post.featured_image && (
            <div className="relative h-[400px] -mx-8 -mt-8 mb-8">
              <img
                src={post.featured_image}
                alt={post.title}
                className="object-cover w-full h-full rounded-t-lg"
              />
            </div>
          )}

          <header className="mb-8">
            {post.categories?.name && (
              <span className="text-sm text-rich-purple mb-2 block">
                {post.categories.name}
              </span>
            )}
            <h1 className="text-4xl font-bold text-rich-gold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-rich-gold/70">
              <CalendarDays className="w-4 h-4 mr-2" />
              {format(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}
            </div>
          </header>

          <div className="prose prose-invert prose-gold max-w-none">
            {post.content}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;