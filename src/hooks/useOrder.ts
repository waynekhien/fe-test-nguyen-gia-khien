import { useCallback, useMemo } from "react";
import { useUrlSync } from "./useUrlSync";
import type { TaskSortField } from "../store/slices/taskSlice";
import type { SorterResult } from "antd/es/table/interface";
import type { Task } from "../types/task";

export function useOrder() {
  const { sort, handleSortChange: urlSortChange } = useUrlSync();

  const handleSortChange = useCallback(
    (sorter: SorterResult<Task> | SorterResult<Task>[]) => {
      const s = Array.isArray(sorter) ? sorter[0] : sorter;
      const field = (s?.columnKey as TaskSortField) ?? null;
      const order = s?.order ?? null;

      urlSortChange(field, order);
    },
    [urlSortChange],
  );

  const getSorter = useMemo(() => {
    const sortableFields: TaskSortField[] = ["title", "dueDate", "priority"];

    return (fieldKey: TaskSortField) => {
      if (!sortableFields.includes(fieldKey)) return {};

      return {
        key: fieldKey,
        sorter: true,
        sortOrder: sort.field === fieldKey ? sort.order : null,
      };
    };
  }, [sort]);

  return {
    handleSortChange,
    getSorter,
  };
}
