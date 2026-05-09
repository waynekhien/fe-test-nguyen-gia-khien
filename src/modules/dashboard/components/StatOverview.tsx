import { useAppSelector } from "../../../store";
import { selectTaskStats } from "../../../store/slices/taskSlice";
import { StatCard } from "./StatCard";
import { Col, Row } from "antd";
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const StatOverview = () => {
  const stats = useAppSelector(selectTaskStats);

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
      backgroundColor: "#eab308",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: <SyncOutlined />,
      backgroundColor: "#0ea5e9",
    },
    {
      title: "Done",
      value: stats.done,
      icon: <CheckCircleOutlined />,
      backgroundColor: "#22c55e",
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
