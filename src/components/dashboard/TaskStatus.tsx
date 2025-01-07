import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskStatusProps } from "@/types";

const TaskStatus: React.FC<TaskStatusProps> = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-500/20 text-yellow-500",
    in_progress: "bg-blue-500/20 text-blue-500",
    completed: "bg-green-500/20 text-green-500",
  };

  return (
    <Badge className={statusStyles[status]}>
      {status.replace("_", " ").toUpperCase()}
    </Badge>
  );
};

export default TaskStatus;
