import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TaskStatisticsProps } from "@/types";

const TaskStatistics: React.FC<TaskStatisticsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;
  const completionRate = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-rich-gold">{totalTasks}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Completed Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-500">{completedTasks}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Completion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={completionRate} className="mb-2" />
          <p className="text-sm text-rich-gold/70">
            {completionRate.toFixed(1)}%
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskStatistics;
