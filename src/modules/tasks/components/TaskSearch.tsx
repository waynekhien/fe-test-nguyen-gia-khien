import { useState, useEffect, useRef } from "react";
import { Input } from "antd";

const { Search } = Input;

interface TaskSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TaskSearch({ value, onChange }: TaskSearchProps) {
  const [localValue, setLocalValue] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      onChange(val);
    }, 300);
  };

  const handleSearch = (val: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    onChange(val);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Search
      placeholder="Search by title..."
      value={localValue}
      onChange={handleChange}
      onSearch={handleSearch}
      allowClear
      style={{ width: "100%" }}
    />
  );
}
