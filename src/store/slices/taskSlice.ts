import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { mockTasks } from "../../mocks/tasks";
import type { Task } from "../../types/task";

export interface TaskFilters {
  searchText: string;
  status: Task["status"][];
  priority: Task["priority"] | null;
  dateRange: [string, string] | null;
}

export interface TaskPagination {
  currentPage: number;
  pageSize: number;
}

export type TaskSortField = "title" | "dueDate" | "priority";
export type TaskSortOrder = "ascend" | "descend" | null;

export interface TaskSort {
  field: TaskSortField | null;
  order: TaskSortOrder;
}

export interface TaskState {
  items: Task[];
  filters: TaskFilters;
  pagination: TaskPagination;
  sort: TaskSort;
}

const initialFilters: TaskFilters = {
  searchText: "",
  status: [],
  priority: null,
  dateRange: null,
};

const initialSort: TaskSort = {
  field: null,
  order: null,
};

const initialState: TaskState = {
  items: mockTasks,
  filters: initialFilters,
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
  sort: initialSort,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    // crud
    addTask(state, action: PayloadAction<Task>) {
      state.items.unshift(action.payload);
    },

    updateTask(state, action: PayloadAction<Task>) {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },

    deleteManyTasks(state, action: PayloadAction<string[]>) {
      const idsToDelete = new Set(action.payload);
      state.items = state.items.filter((t) => !idsToDelete.has(t.id));
    },

    updateTaskStatus(
      state,
      action: PayloadAction<{ id: string; status: Task["status"] }>,
    ) {
      const task = state.items.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },

    // filters
    setFilter(state, action: PayloadAction<Partial<TaskFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1;
    },

    resetFilters(state) {
      state.filters = initialFilters;
      state.pagination.currentPage = 1;
    },

    // pagination
    setPage(state, action: PayloadAction<Partial<TaskPagination>>) {
      if (action.payload.currentPage !== undefined) {
        state.pagination.currentPage = action.payload.currentPage;
      }
      if (action.payload.pageSize !== undefined) {
        state.pagination.pageSize = action.payload.pageSize;
        state.pagination.currentPage = 1;
      }
    },

    // sort
    setSort(state, action: PayloadAction<TaskSort>) {
      state.sort = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  deleteManyTasks,
  updateTaskStatus,
  setFilter,
  resetFilters,
  setPage,
  setSort,
} = taskSlice.actions;

export default taskSlice.reducer;
