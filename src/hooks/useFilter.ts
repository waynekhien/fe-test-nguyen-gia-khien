import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import {
  selectSortedTasks,
  selectPagination,
} from "../store/selectors/taskSelectors";
import { setPage } from "../store/slices/taskSlice";
import { useUrlSync } from "./useUrlSync";
import type { TablePaginationConfig } from "antd";

export function useFilter() {
  const dispatch = useAppDispatch();
  const sortedTasks = useAppSelector(selectSortedTasks);
  const { currentPage, pageSize } = useAppSelector(selectPagination);

  const {
    filters,
    handleSearchChange,
    handleStatusChange,
    handlePriorityChange,
    handleDateRangeChange,
    handleReset,
  } = useUrlSync();

  const handlePaginationChange = useCallback(
    (page: number, size: number) => {
      dispatch(setPage({ currentPage: page, pageSize: size }));
    },
    [dispatch],
  );

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
