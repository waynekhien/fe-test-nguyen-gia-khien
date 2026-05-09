import { useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../store";
import { selectAllTasks } from "../../../store/slices/taskSlice";
import type { Task } from "../../../types/task";
import { STATUS_MAP, PRIORITY_MAP } from "../../../constants/task";
import DeleteTaskModal from "./DeleteTaskModal";

export default function TaskList() {
  const tasks = useAppSelector(selectAllTasks);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);

  const handleDelete = (task: Task) => {
    // TODO: dispatch delete action
    console.log("Delete task:", task.id);
    setDeleteTask(null);
  };

  const columns: ProColumns<Task>[] = [
    {
      title: "Title",
      dataIndex: "title",
      ellipsis: true,
      fixed: "left",
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      valueType: "select",
      valueEnum: {
        todo: { text: STATUS_MAP.todo.text, status: "Default" },
        in_progress: { text: STATUS_MAP.in_progress.text, status: "Processing" },
        done: { text: STATUS_MAP.done.text, status: "Success" },
      },
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
      valueType: "select",
      valueEnum: {
        low: { text: PRIORITY_MAP.low.text },
        medium: { text: PRIORITY_MAP.medium.text },
        high: { text: PRIORITY_MAP.high.text },
      },
      render: (_, record) => {
        const { color, text } = PRIORITY_MAP[record.priority];
        return (
          <Tag color={color} bordered={false}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      width: 100,
      render: (text) => text || "-",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      width: 120,
      search: false,
      render: (text) => text || "-",
    },
    {
      title: "Action",
      valueType: "option",
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button type="link" icon={<EditOutlined />} size="small" />
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => setDeleteTask(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="overflow-x-auto">
        <ProTable<Task>
          columns={columns}
          dataSource={tasks}
          rowKey="id"
          search={{
            labelWidth: "auto",
          }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} tasks`,
          }}
          dateFormatter="string"
          headerTitle="Tasks List"
          scroll={{ x: "max-content" }}
          options={false}
        />
      </div>
      <DeleteTaskModal
        task={deleteTask}
        open={!!deleteTask}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTask(null)}
      />
    </>
  );
}
