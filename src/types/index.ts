export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  created_at: string;
  user_id: string;
}

export interface TaskListProps {
  tasks: Task[];
}

export interface TaskStatisticsProps {
  tasks: Task[];
}

export interface TaskStatusProps {
  status: "pending" | "in_progress" | "completed";
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface CustomerData {
  name: string;
  email: string;
  referralCode: string | null;
}