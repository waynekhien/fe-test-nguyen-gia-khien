import { ProCard, ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Tag, Empty } from "antd";
import { useAppSelector } from "../../../store";
import { selectRecentTasks } from "../../../store/slices/taskSlice";
import type { Task } from "../../../types/task";
import { STATUS_MAP, PRIORITY_MAP } from "../../../constants/task";

const columns: ProColumns<Task>[] = [
  {
    title: "Title",
    dataIndex: "title",
    width: 250,
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 120,
    render: (_, record) => {
      const { color, text } = STATUS_MAP[record.status];
      return <Tag color={color} bordered={false}>{text}</Tag>;
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
];

export default function RecentTask() {
  const tasks = useAppSelector(selectRecentTasks);

  return (
    <ProCard
      title="Recent Tasks"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      bodyStyle={{ flex: 1, padding: 0, paddingLeft: 16, paddingTop: 16 }}
    >
      {tasks.length > 0 ? (
        <ProTable<Task>
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          search={false}
          toolBarRender={false}
          pagination={false}
          scroll={{ x: "max-content" }}
        />
      ) : (
        <div className="flex justify-center items-center py-10">
          <Empty description="No recent tasks found" />
        </div>
      )}
    </ProCard>
  );
}