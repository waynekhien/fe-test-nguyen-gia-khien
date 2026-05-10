import { useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Tag, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Task } from "../../../types/task";
import { STATUS_MAP, PRIORITY_MAP } from "../../../constants/task";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskFilter from "./TaskFilter";
import { useFilter } from "../../../hooks/useFilter";
import { useOrder } from "../../../hooks/useOrder";

export default function TaskList() {
  const {
    dataSource,
    pagination,
    filters,
    handleSearchChange,
    handleStatusChange,
    handlePriorityChange,
    handleDateRangeChange,
    handleReset,
  } = useFilter();
  const { handleSortChange, getSorter } = useOrder();
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
      ...getSorter("title"),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
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
        return (
          <Tag color={color} bordered={false}>
            {text}
          </Tag>
        );
      },
      ...getSorter("priority"),
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
      render: (text) => text || "-",
      ...getSorter("dueDate"),
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
        <TaskFilter
          filters={filters}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onDateRangeChange={handleDateRangeChange}
          onReset={handleReset}
        />
        <ProTable<Task>
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          search={false}
          pagination={pagination}
          onChange={(_pagination, _filters, sorter) => {
            handleSortChange(sorter);
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
