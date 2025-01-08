import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, AlertCircle } from "lucide-react";
import { TaskListProps } from "@/types";

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
      case "in_progress":
        return "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-400 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500">Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-rich-gray/10">
              <TableCell>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-left">
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-md">
                          {task.description}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-md">{task.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(task.status)}>
                  {task.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-gray-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  {formatDate(task.created_at)}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskList;
