import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { mockTasks } from "../../mocks/tasks";
import type { Task } from "../../types/task";
import type { RootState } from "../index";

export interface TaskState {
  items: Task[];
  recentTaskLimit: number;
}

const initialState: TaskState = {
  items: mockTasks,
  recentTaskLimit: 5,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setRecentTaskLimit: (state, action: PayloadAction<number>) => {
      state.recentTaskLimit = action.payload;
    },
  },
});

export const { setRecentTaskLimit } = taskSlice.actions;
export default taskSlice.reducer;

// Selectors
export const selectAllTasks = (state: RootState) => state.task.items;
export const selectRecentTaskLimit = (state: RootState) => state.task.recentTaskLimit;

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => ({
  total: tasks.length,
  todo: tasks.filter((task) => task.status === "todo").length,
  inProgress: tasks.filter((task) => task.status === "in_progress").length,
  done: tasks.filter((task) => task.status === "done").length,
}));

export const selectRecentTasks = createSelector(
  [selectAllTasks, selectRecentTaskLimit],
  (tasks, limit) =>
    [...tasks]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, limit),
);
