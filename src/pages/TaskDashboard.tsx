import React, { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TaskStatistics from "@/components/dashboard/TaskStatistics.tsx";
import TaskList from "@/components/dashboard/TaskList.tsx";
import NewTaskForm from "@/components/dashboard/NewTaskForm.tsx";
import { Task } from "@/types";

const TaskDashboard: React.FC = () => {
  const session = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", session?.user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
      navigate("/login", { state: { from: location } });
    } else {
      fetchTasks();
    }
  }, [session, navigate, location]);

  if (!session) return null;

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
              Task Dashboard
            </h1>
            <p className="text-rich-gold/70 text-base md:text-lg lg:text-xl max-w-3xl">
              Manage and track your tasks efficiently. Create new tasks and
              monitor their progress.
            </p>
          </motion.div>

          <TaskStatistics tasks={tasks} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Task List</CardTitle>
                  <CardDescription>
                    View and track all your tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-rich-gold" />
                    </div>
                  ) : (
                    <TaskList tasks={tasks} />
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create New Task</CardTitle>
                  <CardDescription>Add a new task to your list</CardDescription>
                </CardHeader>
                <CardContent>
                  <NewTaskForm onTaskAdded={fetchTasks} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default TaskDashboard;
