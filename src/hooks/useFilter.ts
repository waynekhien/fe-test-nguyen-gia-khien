import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import {
  selectSortedTasks,
  selectPagination,
  selectFilters,
} from "../store/selectors/taskSelectors";
import { setPage, setFilter, resetFilters } from "../store/slices/taskSlice";
import type { Task } from "../types/task";
import type { TablePaginationConfig } from "antd";

export function useFilter() {
  const dispatch = useAppDispatch();
  const sortedTasks = useAppSelector(selectSortedTasks);
  const { currentPage, pageSize } = useAppSelector(selectPagination);
  const filters = useAppSelector(selectFilters);

  const handlePaginationChange = useCallback(
    (page: number, size: number) => {
      dispatch(setPage({ currentPage: page, pageSize: size }));
    },
    [dispatch],
  );

  const handleSearchChange = useCallback(
    (searchText: string) => {
      dispatch(setFilter({ searchText }));
    },
    [dispatch],
  );

  const handleStatusChange = useCallback(
    (status: Task["status"][]) => {
      dispatch(setFilter({ status }));
    },
    [dispatch],
  );

  const handlePriorityChange = useCallback(
    (priority: Task["priority"] | null) => {
      dispatch(setFilter({ priority }));
    },
    [dispatch],
  );

  const handleDateRangeChange = useCallback(
    (dateRange: [string, string] | null) => {
      dispatch(setFilter({ dateRange }));
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const paginationConfig: TablePaginationConfig = {
    current: currentPage,
    pageSize,
    total: sortedTasks.length,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "50"],
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} tasks`,
    onChange: handlePaginationChange,
  };

  return {
    dataSource: sortedTasks,
    pagination: paginationConfig,
    filters,
    handleSearchChange,
    handleStatusChange,
    handlePriorityChange,
    handleDateRangeChange,
    handleReset,
  };
}
