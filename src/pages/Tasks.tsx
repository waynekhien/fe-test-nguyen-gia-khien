import { PageContainer } from "@ant-design/pro-components";
import TaskList from "../modules/tasks/components/TaskList";
import { Button } from "antd";

const Tasks = () => {
  return (
    <PageContainer
      title="Tasks Page"
      extra={<Button type="primary">Add Task</Button>}
    >
      <TaskList />
    </PageContainer>
  );
};

export default Tasks;
