import { useEffect } from "react";
import {
  useQueryState,
  parseAsString,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs";
import { useAppDispatch } from "../store";
import { setFilter, setSort } from "../store/slices/taskSlice";
import type { TaskSortField, TaskSortOrder } from "../store/slices/taskSlice";
import type { Task } from "../types/task";

const SORT_FIELDS = ["title", "dueDate", "priority"] as const;
const SORT_ORDERS = ["ascend", "descend"] as const;
const STATUSES = ["todo", "in_progress", "done"] as const;
const PRIORITIES = ["low", "medium", "high"] as const;

export function useUrlSync() {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [status, setStatus] = useQueryState(
    "status",
    parseAsArrayOf(parseAsStringLiteral(STATUSES)).withDefault([]),
  );
  const [priority, setPriority] = useQueryState(
    "priority",
    parseAsStringLiteral(PRIORITIES),
  );
  const [dateFrom, setDateFrom] = useQueryState(
    "dateFrom",
    parseAsString.withDefault(""),
  );
  const [dateTo, setDateTo] = useQueryState(
    "dateTo",
    parseAsString.withDefault(""),
  );
  const [sortField, setSortField] = useQueryState(
    "sortField",
    parseAsStringLiteral(SORT_FIELDS),
  );
  const [sortOrder, setSortOrder] = useQueryState(
    "sortOrder",
    parseAsStringLiteral(SORT_ORDERS),
  );

  useEffect(() => {
    dispatch(
      setFilter({
        searchText: search,
        status: status as Task["status"][],
        priority: (priority as Task["priority"]) ?? null,
        dateRange:
          dateFrom && dateTo ? [dateFrom, dateTo] : null,
      }),
    );
  }, [search, status, priority, dateFrom, dateTo, dispatch]);

  useEffect(() => {
    dispatch(
      setSort({
        field: (sortField as TaskSortField) ?? null,
        order: (sortOrder as TaskSortOrder) ?? null,
      }),
    );
  }, [sortField, sortOrder, dispatch]);

  const handleSearchChange = (value: string) => {
    setSearch(value || null);
  };

  const handleStatusChange = (value: Task["status"][]) => {
    setStatus(value.length > 0 ? value : null);
  };

  const handlePriorityChange = (value: Task["priority"] | null) => {
    setPriority(value);
  };

  const handleDateRangeChange = (value: [string, string] | null) => {
    if (value) {
      setDateFrom(value[0]);
      setDateTo(value[1]);
    } else {
      setDateFrom(null);
      setDateTo(null);
    }
  };

  const handleSortChange = (
    field: TaskSortField | null,
    order: TaskSortOrder,
  ) => {
    setSortField(field);
    setSortOrder(order === "ascend" || order === "descend" ? order : null);
  };

  const handleReset = () => {
    setSearch(null);
    setStatus(null);
    setPriority(null);
    setDateFrom(null);
    setDateTo(null);
    setSortField(null);
    setSortOrder(null);
  };

  return {
    filters: {
      searchText: search,
      status: status as Task["status"][],
      priority: (priority as Task["priority"]) ?? null,
      dateRange:
        dateFrom && dateTo ? ([dateFrom, dateTo] as [string, string]) : null,
    },
    sort: {
      field: (sortField as TaskSortField) ?? null,
      order: (sortOrder as TaskSortOrder) ?? null,
    },
    handleSearchChange,
    handleStatusChange,
    handlePriorityChange,
    handleDateRangeChange,
    handleSortChange,
    handleReset,
  };
}
