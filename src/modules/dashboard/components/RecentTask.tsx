import { ProCard, ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Select, Tag } from "antd";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  selectRecentTasks,
  selectRecentTaskLimit,
  setRecentTaskLimit,
} from "../../../store/slices/taskSlice";
import type { Task } from "../../../types/task";
import {
  STATUS_MAP,
  PRIORITY_MAP,
  RECENT_TASK_LIMIT_OPTIONS,
} from "../../../constants/task";

const columns: ProColumns<Task>[] = [
  {
    title: "Title",
    dataIndex: "title",
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 120,
    render: (_, record) => {
      const { color, text } = STATUS_MAP[record.status];
      return (
        <Tag color={color} bordered={false}>
          {text}
        </Tag>
      );
    },
  },
  {
    title: "Priority",
    dataIndex: "priority",
    width: 100,
    render: (_, record) => {
      const { color, text } = PRIORITY_MAP[record.priority];
      return <Tag color={color} bordered={false}>{text}</Tag>;
    },
  },
  {
    title: "Assignee",
    dataIndex: "assignee",
    width: 140,
    render: (text) => text || "-",
    responsive: ["md"],
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    width: 120,
    responsive: ["lg"],
  },
];

export default function RecentTask() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectRecentTasks);
  const limit = useAppSelector(selectRecentTaskLimit);

  return (
    <ProCard
      title="Recent Tasks"
      style={{ marginTop: 16 }}
      extra={
        <Select
          value={limit}
          options={RECENT_TASK_LIMIT_OPTIONS}
          onChange={(value) => dispatch(setRecentTaskLimit(value))}
          size="small"
          style={{ width: 120 }}
        />
      }
    >
      <ProTable<Task>
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        search={false}
        toolBarRender={false}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </ProCard>
  );
}
