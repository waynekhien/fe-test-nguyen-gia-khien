import { useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import type { ProColumns } from "@ant-design/pro-components";
import { Tag, Button, Space, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Task } from "../../../types/task";
import { STATUS_MAP, PRIORITY_MAP } from "../../../constants/task";
import DeleteTaskModal from "./DeleteTaskModal";
import TaskFilter from "./TaskFilter";
import { useFilter } from "../../../hooks/useFilter";
import { useOrder } from "../../../hooks/useOrder";
import { useTaskActions } from "../../../hooks/useTaskActions";

interface TaskListProps {
  onEdit: (task: Task) => void;
}

export default function TaskList({ onEdit }: TaskListProps) {
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
  const { handleDelete, handleBulkDelete, handleUpdateStatus } = useTaskActions();
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onConfirmDelete = (task: Task) => {
    handleDelete(task);
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
      width: 140,
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(value) => handleUpdateStatus(record.id, value)}
          variant="borderless"
          style={{ width: "100%" }}
          options={Object.entries(STATUS_MAP).map(([value, { color, text }]) => ({
            label: (
              <Tag color={color} bordered={false}>
                {text}
              </Tag>
            ),
            value,
          }))}
        />
      ),
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
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => onEdit(record)} />
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
          toolBarRender={() =>
            selectedRowKeys.length > 0
              ? [
                  <Button
                    key="bulk-delete"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      handleBulkDelete(selectedRowKeys as string[], () =>
                        setSelectedRowKeys([]),
                      )
                    }
                  >
                    Delete {selectedRowKeys.length} task(s)
                  </Button>,
                ]
              : []
          }
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          scroll={{ x: "max-content" }}
          options={false}
        />
      </div>
      <DeleteTaskModal
        task={deleteTask}
        open={!!deleteTask}
        onConfirm={onConfirmDelete}
        onCancel={() => setDeleteTask(null)}
      />
    </>
  );
}
