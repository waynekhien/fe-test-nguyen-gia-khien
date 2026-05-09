import { PageContainer } from "@ant-design/pro-components";
import RecentTask from "../modules/dashboard/components/RecentTask";
import StatOverview from "../modules/dashboard/components/StatOverview";

const Dashboard = () => {
  return (
    <PageContainer title={false}>
      <StatOverview />
      <RecentTask />
    </PageContainer>
  );
};

export default Dashboard;
