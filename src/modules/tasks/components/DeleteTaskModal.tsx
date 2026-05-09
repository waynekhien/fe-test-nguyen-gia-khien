import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import type { Task } from "../../../types/task";

interface DeleteTaskModalProps {
  task: Task | null;
  open: boolean;
  onConfirm: (task: Task) => void;
  onCancel: () => void;
}

export default function DeleteTaskModal({
  task,
  open,
  onConfirm,
  onCancel,
}: DeleteTaskModalProps) {
  return (
    <Modal
      title={
        <span>
          <ExclamationCircleOutlined className="text-red-500 mr-2" />
          Confirm Delete
        </span>
      }
      open={open}
      onOk={() => task && onConfirm(task)}
      onCancel={onCancel}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true }}
    >
      <p>
        Are you sure you want to delete task{" "}
        <strong>"{task?.title}"</strong>? This action cannot be undone.
      </p>
    </Modal>
  );
}
