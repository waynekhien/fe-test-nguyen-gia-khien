import { createSlice, createSelector } from "@reduxjs/toolkit";
import { mockTasks } from "../../mocks/tasks";
import type { Task } from "../../types/task";
import type { RootState } from "../index";

export interface TaskState {
  items: Task[];
}

const initialState: TaskState = {
  items: mockTasks,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;

// Selectors
export const selectAllTasks = (state: RootState) => state.task.items;

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => ({
  total: tasks.length,
  todo: tasks.filter((task) => task.status === "todo").length,
  inProgress: tasks.filter((task) => task.status === "in_progress").length,
  done: tasks.filter((task) => task.status === "done").length,
}));

export const selectRecentTasks = createSelector(
  [selectAllTasks],
  (tasks) =>
    [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5),
);
