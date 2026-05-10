import { useAppSelector } from "../../../store";
import { selectTaskStats } from "../../../store/selectors/taskSelectors";
import { StatCard } from "./StatCard";
import { Col, Row, Empty, Card } from "antd";
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { STATUS_MAP } from "../../../constants/task";

const StatOverview = () => {
  const stats = useAppSelector(selectTaskStats);

  if (stats.total === 0) {
    return (
      <Card style={{ marginBottom: 16 }}>
        <div className="flex justify-center items-center py-6">
          <Empty description="No task statistics available" />
        </div>
      </Card>
    );
  }

  const statCards = [
    {
      title: "Total",
      value: stats.total,
      icon: <AppstoreOutlined />,
      backgroundColor: "#4f46e5",
    },
    {
      title: "Todo",
      value: stats.todo,
      icon: <ClockCircleOutlined />,
      backgroundColor: STATUS_MAP.todo.hexColor,
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <SyncOutlined />,
      backgroundColor: STATUS_MAP.in_progress.hexColor,
    },
    {
      title: "Done",
      value: stats.done,
      icon: <CheckCircleOutlined />,
      backgroundColor: STATUS_MAP.done.hexColor,
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {statCards.map((item) => (
        <Col key={item.title} xs={24} sm={12} lg={6}>
          <StatCard
            title={item.title}
            value={item.value}
            icon={item.icon}
            backgroundColor={item.backgroundColor}
          />
        </Col>
      ))}
    </Row>
  );
};

export default StatOverview;
