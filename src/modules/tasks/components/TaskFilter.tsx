import { Select, DatePicker, Button, Card, Row, Col, Flex, theme } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { STATUS_MAP, PRIORITY_MAP } from "../../../constants/task";
import type { Task } from "../../../types/task";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import TaskSearch from "./TaskSearch";

const { RangePicker } = DatePicker;

interface TaskFilterProps {
  filters: {
    searchText: string;
    status: Task["status"][];
    priority: Task["priority"] | null;
    dateRange: [string, string] | null;
  };
  onSearchChange: (value: string) => void;
  onStatusChange: (value: Task["status"][]) => void;
  onPriorityChange: (value: Task["priority"] | null) => void;
  onDateRangeChange: (value: [string, string] | null) => void;
  onReset: () => void;
}

const statusOptions = Object.entries(STATUS_MAP).map(([value, { text }]) => ({
  label: text,
  value: value as Task["status"],
}));

const priorityOptions = Object.entries(PRIORITY_MAP).map(
  ([value, { text }]) => ({
    label: text,
    value: value as Task["priority"],
  }),
);


const { useToken } = theme;

export default function TaskFilter({
  filters,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onDateRangeChange,
  onReset,
}: TaskFilterProps) {
  const { token } = useToken();

  const labelStyle: React.CSSProperties = {
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 4,
    color: token.colorTextSecondary,
  };

  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
  ) => {
    if (dates && dates[0] && dates[1]) {
      onDateRangeChange([
        dates[0].format("YYYY-MM-DD"),
        dates[1].format("YYYY-MM-DD"),
      ]);
    } else {
      onDateRangeChange(null);
    }
  };

  const dateValue: [Dayjs, Dayjs] | null = filters.dateRange
    ? [dayjs(filters.dateRange[0]), dayjs(filters.dateRange[1])]
    : null;

  const hasActiveFilters =
    filters.searchText.length > 0 ||
    filters.status.length > 0 ||
    filters.priority !== null ||
    filters.dateRange !== null;

  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Row gutter={[16, 12]}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div style={labelStyle}>
            Search
          </div>
          <TaskSearch value={filters.searchText} onChange={onSearchChange} />
        </Col>

        <Col xs={24} sm={12} md={12} lg={8} xl={6}>
          <div style={labelStyle}>Status</div>
          <Select
            mode="multiple"
            placeholder="All statuses"
            value={filters.status}
            onChange={onStatusChange}
            options={statusOptions}
            allowClear
            style={{ width: "100%" }}
            maxTagCount="responsive"
          />
        </Col>

        <Col xs={24} sm={12} md={8} lg={4} xl={4}>
          <div style={labelStyle}>Priority</div>
          <Select
            placeholder="All"
            value={filters.priority}
            onChange={(val) => onPriorityChange(val ?? null)}
            options={priorityOptions}
            allowClear
            style={{ width: "100%" }}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={8} xl={6}>
          <div style={labelStyle}>Due Date Range</div>
          <RangePicker
            value={dateValue}
            onChange={handleDateChange}
            placeholder={["Start date", "End date"]}
            style={{ width: "100%" }}
          />
        </Col>

        <Col xs={24} sm={24} md={4} lg={4} xl={2}>
          <Flex align="flex-end" style={{ height: "100%" }}>
            <Button
              icon={<UndoOutlined />}
              onClick={onReset}
              disabled={!hasActiveFilters}
              block
            >
              Reset
            </Button>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}
