import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export const selectAllTasks = (state: RootState) => state.task.items;
export const selectFilters = (state: RootState) => state.task.filters;
export const selectPagination = (state: RootState) => state.task.pagination;
export const selectSort = (state: RootState) => state.task.sort;

export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectFilters],
  (tasks, filters) => {
    let result = tasks;
    if (filters.searchText) {
      const keyword = filters.searchText.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(keyword) ||
          t.description?.toLowerCase().includes(keyword),
      );
    }

    if (filters.status.length > 0) {
      result = result.filter((t) => filters.status.includes(t.status));
    }

    if (filters.priority) {
      result = result.filter((t) => t.priority === filters.priority);
    }

    if (filters.dateRange) {
      const [start, end] = filters.dateRange;
      result = result.filter((t) => {
        if (!t.dueDate) return false;
        return t.dueDate >= start && t.dueDate <= end;
      });
    }

    return result;
  },
);

const PRIORITY_ORDER: Record<string, number> = { high: 3, medium: 2, low: 1 };

export const selectSortedTasks = createSelector(
  [selectFilteredTasks, selectSort],
  (tasks, sort) => {
    if (!sort.field || !sort.order) return tasks;

    const sorted = [...tasks].sort((a, b) => {
      let cmp = 0;

      switch (sort.field) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "dueDate": {
          const da = a.dueDate ?? "";
          const db = b.dueDate ?? "";
          cmp = da.localeCompare(db);
          break;
        }
        case "priority":
          cmp =
            (PRIORITY_ORDER[a.priority] ?? 0) -
            (PRIORITY_ORDER[b.priority] ?? 0);
          break;
      }

      return sort.order === "descend" ? -cmp : cmp;
    });

    return sorted;
  },
);

export const selectPaginatedTasks = createSelector(
  [selectSortedTasks, selectPagination],
  (sorted, { currentPage, pageSize }) => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  },
);

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => ({
  total: tasks.length,
  todo: tasks.filter((t) => t.status === "todo").length,
  inProgress: tasks.filter((t) => t.status === "in_progress").length,
  done: tasks.filter((t) => t.status === "done").length,
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
