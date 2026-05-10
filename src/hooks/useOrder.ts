import { useCallback, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../store";
import { selectSort, selectSortedTasks } from "../store/selectors/taskSelectors";
import { setSort } from "../store/slices/taskSlice";
import type { TaskSortField, TaskSortOrder } from "../store/slices/taskSlice";
import type { SorterResult } from "antd/es/table/interface";
import type { Task } from "../types/task";

export function useOrder() {
  const dispatch = useAppDispatch();
  const sort = useAppSelector(selectSort);
  const sortedData = useAppSelector(selectSortedTasks);

  const handleSortChange = useCallback(
    (sorter: SorterResult<Task> | SorterResult<Task>[]) => {
      const s = Array.isArray(sorter) ? sorter[0] : sorter;
      const field = (s?.columnKey as TaskSortField) ?? null;
      const order = (s?.order as TaskSortOrder) ?? null;

      dispatch(setSort({ field, order }));
    },
    [dispatch],
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
    sortedData,
    handleSortChange,
    getSorter,
  };
}
