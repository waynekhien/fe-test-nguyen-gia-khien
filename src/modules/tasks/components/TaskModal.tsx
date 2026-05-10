import { useEffect } from "react";
import { Modal, Form, Input, Select, Radio, DatePicker } from "antd";
import type { Task } from "../../../types/task";
import { STATUS_MAP, PRIORITY_MAP } from "../../../constants/task";
import { useTaskActions } from "../../../hooks/useTaskActions";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface TaskModalProps {
  open: boolean;
  task: Task | null;
  onCancel: () => void;
}

const statusOptions = Object.entries(STATUS_MAP).map(([value, { text }]) => ({
  label: text,
  value,
}));

const priorityOptions = Object.entries(PRIORITY_MAP).map(
  ([value, { text }]) => ({
    label: text,
    value,
  }),
);

interface TaskFormValues {
  title: string;
  description?: string;
  status: Task["status"];
  priority: Task["priority"];
  assignee?: string;
  dueDate?: Dayjs;
  tags?: string[];
}

export default function TaskModal({ open, task, onCancel }: TaskModalProps) {
  const [form] = Form.useForm<TaskFormValues>();
  const { handleAdd, handleUpdate } = useTaskActions();
  const isEdit = task !== null;

  useEffect(() => {
    if (open) {
      if (task) {
        form.setFieldsValue({
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          assignee: task.assignee,
          dueDate: task.dueDate ? dayjs(task.dueDate) : undefined,
          tags: task.tags,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, task, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const taskData: Task = {
        id: isEdit ? task.id : crypto.randomUUID(),
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority,
        assignee: values.assignee,
        dueDate: values.dueDate?.format("YYYY-MM-DD"),
        createdAt: isEdit ? task.createdAt : new Date().toISOString(),
        tags: values.tags,
      };

      if (isEdit) {
        handleUpdate(taskData);
      } else {
        handleAdd(taskData);
      }

      form.resetFields();
      onCancel();
    } catch (error) {
      if (error && typeof error === "object" && "errorFields" in error) return;
      console.error("TaskModal submit error:", error);
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit Task" : "Add New Task"}
      open={open}
      onOk={handleSubmit}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      okText={isEdit ? "Save" : "Create"}
      cancelText="Cancel"
      width={800}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          status: "todo",
          priority: "medium",
        }}
        style={{ marginTop: 16 }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: "Please enter a title" },
            { max: 200, message: "Title cannot exceed 200 characters" },
          ]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { max: 1000, message: "Description cannot exceed 1000 characters" },
          ]}
        >
          <Input.TextArea
            placeholder="Enter task description"
            rows={3}
            showCount
            maxLength={1000}
          />
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select a status" }]}
        >
          <Select options={statusOptions} placeholder="Select status" />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select a priority" }]}
        >
          <Radio.Group options={priorityOptions} optionType="button" />
        </Form.Item>

        <Form.Item name="assignee" label="Assignee">
          <Input placeholder="Enter assignee name" />
        </Form.Item>

        <Form.Item name="dueDate" label="Due Date">
          <DatePicker style={{ width: "100%" }} placeholder="Select due date" />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select
            mode="tags"
            placeholder="Type and press Enter to add tags"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
