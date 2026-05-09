import { Card } from "antd";
import type { ReactNode } from "react";

export interface StatCardProps {
  title: string;
  value: number;
  icon?: ReactNode;
  backgroundColor?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  backgroundColor = "#6366f1",
}: StatCardProps) => {
  return (
    <Card styles={{ body: { backgroundColor, borderRadius: 8 } }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg text-white">{title}</span>
        {icon && <span className="text-2xl text-white/80">{icon}</span>}
      </div>
      <p className="text-2xl font-bold text-white m-0">{value}</p>
    </Card>
  );
};
