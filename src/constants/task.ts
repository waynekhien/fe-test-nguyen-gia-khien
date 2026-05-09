import type { Task } from "../types/task";

export const STATUS_MAP: Record<Task["status"], { color: string; text: string }> = {
  todo: { color: "default", text: "Todo" },
  in_progress: { color: "processing", text: "In Progress" },
  done: { color: "success", text: "Done" },
};

export const PRIORITY_MAP: Record<Task["priority"], { color: string; text: string }> = {
  low: { color: "green", text: "Low" },
  medium: { color: "orange", text: "Medium" },
  high: { color: "red", text: "High" },
};

export const RECENT_TASK_LIMIT_OPTIONS = [
  { label: "5 tasks", value: 5 },
  { label: "10 tasks", value: 10 },
  { label: "20 tasks", value: 20 },
];
