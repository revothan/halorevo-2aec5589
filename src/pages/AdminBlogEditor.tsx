import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogEditorForm, PostFormData } from "@/components/blog/BlogEditorForm";

const AdminBlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session } = useSessionContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!session?.user) {
      navigate("/login");
      return;
    }
  }, [session, navigate]);

  // Fetch categories for the dropdown
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name");
      if (error) throw error;
      return data;
    },
  });

  // Fetch existing post data if editing
  const { data: existingPost } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const onSubmit = async (data: PostFormData) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create or edit posts",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const postData = {
        ...data,
        author_id: session.user.id,
        published_at: data.published ? new Date().toISOString() : null,
      };

      if (id) {
        const { error } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Post updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("posts")
          .insert([postData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Post created successfully",
        });
      }

      navigate("/blog");
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-rich-black p-4 md:p-8">
      <div className="max-w-4xl mx-auto glass-card p-6">
        <h1 className="text-3xl font-bold mb-8 text-rich-gold">
          {id ? "Edit Post" : "Create New Post"}
        </h1>

        <BlogEditorForm
          initialData={existingPost}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => navigate("/blog")}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default AdminBlogEditor;