import { Card } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { selectTaskStats } from "../../../store/selectors/taskSelectors";
import { STATUS_MAP } from "../../../constants/task";
import { useAppSelector } from "../../../store";

const getChartData = (stats: ReturnType<typeof selectTaskStats>) => [
  {
    name: STATUS_MAP.todo.text,
    count: stats.todo,
    color: STATUS_MAP.todo.hexColor,
  },
  {
    name: STATUS_MAP.in_progress.text,
    count: stats.inProgress,
    color: STATUS_MAP.in_progress.hexColor,
  },
  {
    name: STATUS_MAP.done.text,
    count: stats.done,
    color: STATUS_MAP.done.hexColor,
  },
];

export default function AnalyticsChart() {
  const stats = useAppSelector(selectTaskStats);
  const chartData = getChartData(stats);

  return (
    <Card
      title="Tasks by Status"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      styles={{ body: { flex: 1, padding: "24px", minHeight: "350px" } }}
    >
      {stats.total === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <BarChartOutlined className="text-4xl text-gray-300" />
          <div className="text-sm text-gray-400 mt-2">No data available</div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 13, fill: "#666", fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#999" }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              formatter={(value) => [value, "Tasks"]}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
