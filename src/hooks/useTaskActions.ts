import { useCallback } from "react";
import { App } from "antd";
import { useAppDispatch } from "../store";
import {
  addTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
  updateTaskStatus,
} from "../store/slices/taskSlice";
import type { Task } from "../types/task";

export function useTaskActions() {
  const dispatch = useAppDispatch();
  const { message, modal } = App.useApp();

  const handleAdd = useCallback(
    (task: Task) => {
      try {
        dispatch(addTask(task));
        message.success("Task created successfully");
      } catch {
        message.error("Failed to create task");
      }
    },
    [dispatch, message],
  );

  const handleUpdate = useCallback(
    (task: Task) => {
      try {
        dispatch(updateTask(task));
        message.success(`Task "${task.title}" updated successfully`);
      } catch {
        message.error("Failed to update task");
      }
    },
    [dispatch, message],
  );

  const handleDelete = useCallback(
    (task: Task) => {
      try {
        dispatch(deleteTask(task.id));
        message.success(`Task "${task.title}" deleted successfully`);
      } catch {
        message.error("Failed to delete task");
      }
    },
    [dispatch, message],
  );

  const handleDeleteMany = useCallback(
    (ids: string[]) => {
      try {
        dispatch(deleteManyTasks(ids));
        message.success(`${ids.length} task(s) deleted successfully`);
      } catch {
        message.error("Failed to delete tasks");
      }
    },
    [dispatch, message],
  );

  const handleBulkDelete = useCallback(
    (ids: string[], onSuccess?: () => void) => {
      modal.confirm({
        title: "Delete Selected Tasks",
        content: `Are you sure you want to delete ${ids.length} task(s)? This action cannot be undone.`,
        okText: "Delete",
        okButtonProps: { danger: true },
        onOk: () => {
          handleDeleteMany(ids);
          onSuccess?.();
        },
      });
    },
    [modal, handleDeleteMany],
  );

  const handleUpdateStatus = useCallback(
    (id: string, status: Task["status"]) => {
      try {
        dispatch(updateTaskStatus({ id, status }));
        message.success("Task status updated successfully");
      } catch {
        message.error("Failed to update task status");
      }
    },
    [dispatch, message],
  );

  return {
    handleAdd,
    handleUpdate,
    handleDelete,
    handleDeleteMany,
    handleBulkDelete,
    handleUpdateStatus,
  };
}
