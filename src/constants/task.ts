import type { Task } from "../types/task";

export const STATUS_MAP: Record<Task["status"], { color: string; hexColor: string; text: string }> = {
  todo: { color: "default", hexColor: "#eab308", text: "Todo" },
  in_progress: { color: "processing", hexColor: "#0ea5e9", text: "In Progress" },
  done: { color: "success", hexColor: "#22c55e", text: "Done" },
};

export const PRIORITY_MAP: Record<Task["priority"], { color: string; text: string }> = {
  low: { color: "success", text: "Low" },
  medium: { color: "warning", text: "Medium" },
  high: { color: "error", text: "High" },
};
