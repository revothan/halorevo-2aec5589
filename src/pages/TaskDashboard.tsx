import React, { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2,
  PlusCircle,
  ListTodo,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  LogOut,
} from "lucide-react";
import TaskStatistics from "@/components/dashboard/TaskStatistics";
import TaskList from "@/components/dashboard/TaskList";
import NewTaskForm from "@/components/dashboard/NewTaskForm";
import { Task } from "@/types";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import { SubscriptionGate } from "@/components/dashboard/SubscriptionGate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { session } = useSessionContext();
  const { hasActiveSubscription, isLoading: subscriptionLoading } =
    useSubscriptionStatus();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!session?.user?.id) return;

      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        // Type cast the data to ensure it matches the Task interface
        const typedTasks = (data || []).map(task => ({
          ...task,
          status: task.status as "pending" | "in_progress" | "completed",
          priority: task.priority as "low" | "medium" | "high"
        }));
        
        setTasks(typedTasks);
        setFilteredTasks(typedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [session]);

  useEffect(() => {
    let result = tasks;

    if (statusFilter !== "all") {
      result = result.filter((task) => task.status === statusFilter);
    }

    if (searchQuery) {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredTasks(result);
  }, [statusFilter, searchQuery, tasks]);

  const handleTaskAdded = (newTask: Task) => {
    setTasks((currentTasks) => [newTask, ...currentTasks]);
    setIsDialogOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Logged out successfully",
        description: "You have been securely logged out.",
      });

      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error logging out",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-rich-gold" />
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in_progress",
  ).length;

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header Section - Optimized for mobile */}
      <div className="space-y-4 md:space-y-0 md:flex md:justify-between md:items-center mb-8">
        <div className="flex justify-between items-center w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Task Dashboard</h1>
          {/* Mobile-only logout button */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="block md:hidden border-rich-gold/30 text-rich-gold hover:bg-rich-gold/10"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 md:gap-4 justify-end">
          {hasActiveSubscription && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-rich-gold hover:bg-rich-gold/90 w-full sm:w-auto">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your dashboard. Fill out the details
                    below.
                  </DialogDescription>
                </DialogHeader>
                <NewTaskForm onTaskAdded={handleTaskAdded} />
              </DialogContent>
            </Dialog>
          )}

          {/* Desktop-only logout button */}
          <Button
            variant="outline"
            onClick={handleLogout}
            className="hidden md:inline-flex border-rich-gold/30 text-rich-gold hover:bg-rich-gold/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>

      {hasActiveSubscription ? (
        <>
          {/* Statistics Grid - Responsive layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <ListTodo className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-xl md:text-2xl font-bold">
                  {totalTasks}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Pending
                </CardTitle>
                <Clock className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-xl md:text-2xl font-bold">
                  {pendingTasks}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  In Progress
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-xl md:text-2xl font-bold">
                  {inProgressTasks}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Completed
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="text-xl md:text-2xl font-bold">
                  {completedTasks}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter Section - Stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tasks List Card */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle>Your Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <TaskList tasks={filteredTasks} />
            </CardContent>
          </Card>
        </>
      ) : (
        <SubscriptionGate />
      )}
    </div>
  );
};

export default TaskDashboard;
