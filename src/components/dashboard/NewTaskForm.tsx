import React from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client"; // Added this import
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Task } from "@/types";

interface FormValues {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

interface NewTaskFormProps {
  onTaskAdded: (newTask: Task) => void;
}

const NewTaskForm = ({ onTaskAdded }: NewTaskFormProps) => {
  const { toast } = useToast();
  const session = useSession();
  const dialogClose = React.useRef<HTMLButtonElement>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      if (!data.title || !data.description) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      const newTask = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: "pending",
        user_id: session?.user?.id,
      };

      const { data: createdTask, error } = await supabase
        .from("tasks")
        .insert(newTask)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Task created successfully",
        description: "Your new task has been added to your dashboard.",
      });

      form.reset();
      onTaskAdded(createdTask);
      dialogClose.current?.click();
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Error creating task",
        description:
          "Please try again. If the problem persists, contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the task title"
                  {...field}
                  className="bg-background"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the task in detail"
                  className="min-h-[100px] bg-background"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Priority Field */}
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <DialogClose ref={dialogClose} asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Task"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewTaskForm;
