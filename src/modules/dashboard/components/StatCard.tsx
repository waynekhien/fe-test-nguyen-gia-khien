import { Card, Statistic } from "antd";
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
      <div className="flex flex-col">
        {icon && <div className="text-3xl text-white/80">{icon}</div>}
        <Statistic
          value={value}
          valueStyle={{ color: "white", fontWeight: "bold", fontSize: "1.875rem" }}
        />
        <div className="text-lg text-white/90">{title}</div>
      </div>
    </Card>
  );
};
