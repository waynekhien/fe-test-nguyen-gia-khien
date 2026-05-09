import { PageContainer } from "@ant-design/pro-components";
import { Row, Col } from "antd";
import RecentTask from "../modules/dashboard/components/RecentTask";
import StatOverview from "../modules/dashboard/components/StatOverview";
import AnalyticsChart from "../modules/dashboard/components/AnalyticsChart";

const Dashboard = () => {
  return (
    <PageContainer title={false}>
      <StatOverview />
      <Row gutter={[16, 16]} style={{ marginTop: 16 }} align="stretch">
        <Col xs={24} lg={12}>
          <AnalyticsChart />
        </Col>
        <Col xs={24} lg={12}>
          <RecentTask />
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
