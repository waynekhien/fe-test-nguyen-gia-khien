import { useState } from "react";
import { PageContainer } from "@ant-design/pro-components";
import TaskList from "../modules/tasks/components/TaskList";
import TaskModal from "../modules/tasks/components/TaskModal";
import { Button } from "antd";
import type { Task } from "../types/task";

const Tasks = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState<Task | null>(null);

  const handleAdd = () => {
    setModalTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setModalTask(task);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalTask(null);
  };

  return (
    <PageContainer
      title="Tasks Page"
      extra={
        <Button type="primary" onClick={handleAdd}>
          Add Task
        </Button>
      }
    >
      <TaskList onEdit={handleEdit} />
      <TaskModal
        open={modalOpen}
        task={modalTask}
        onCancel={handleModalClose}
      />
    </PageContainer>
  );
};

export default Tasks;
