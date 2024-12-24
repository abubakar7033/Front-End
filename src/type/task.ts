import { InputHTMLAttributes, MouseEventHandler, ReactNode } from "react";

export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
}
export interface ButtonProps {
  type?: string;
  text?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, currentStatus: boolean) => void;
  onDeleteHandler: (taskId: string) => void;
}
export interface TaskListProps {
  tasks: Task[];
  todoList: object;
  onToggleComplete: (taskId: string, currentStatus: boolean) => void;
  onDeleteHandler: (taskId: string) => void;
  isLoading: boolean;
}
export interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color: string;
  className?: string;
  children?: ReactNode;
}
export interface LoaderProps {
  variant: "threeDot" | "default";
  className?: string;
}
