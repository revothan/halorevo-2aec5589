import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface BugReportForm {
  title: string;
  description: string;
}

const BugReport = () => {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BugReportForm>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!session) {
      navigate("/login", { state: { from: location } });
    }
  }, [session, navigate, location]);

  if (!session) return null;

  const onSubmit = async (data: BugReportForm) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.from("bugs").insert({
        title: data.title,
        description: data.description,
        reporter_id: session.user.id,
      });

      if (error) throw error;

      toast({
        title: "Bug report submitted",
        description: "Thank you for your feedback!",
      });

      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit bug report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-rich-black min-h-screen p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto glass-card border border-rich-gray/30 relative">
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <div className="px-6 pt-36 pb-12 md:px-16 lg:px-24">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rich-gold to-rich-gold/70 bg-clip-text text-transparent text-left mb-4 md:mb-6">
              Submit a Bug Report
            </h1>
            <p className="text-rich-gold/70 text-base md:text-lg lg:text-xl max-w-3xl">
              Help us improve by reporting any issues you encounter. We appreciate your feedback!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Brief description of the issue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please provide detailed information about the bug..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default BugReport;
