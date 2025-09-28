import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getDatesOfThisMonth, getDatesOfThisWeek } from "@/lib/date-utils";

export interface RangeSchema {
  id: "week" | "month" | "year";
  name: string;
}
export const RangeSelects: RangeSchema[] = [
  {
    id: "week",
    name: "This Week",
  },
  {
    id: "month",
    name: "This Month",
  },
  {
    id: "year",
    name: "This Year",
  },
];

interface DateRangeSelectProps {
  onChange?: (value: Date[]) => void;
}
const DateRangeSelect: React.FC<DateRangeSelectProps> = ({ onChange }) => {
  const handleChange = (value: string) => {
    if (!onChange) return;

    if (value === "week") {
      return onChange(getDatesOfThisWeek());
    } else if (value === "month") {
      return onChange(getDatesOfThisMonth());
    }
  };

  return (
    <Select onValueChange={handleChange} defaultValue={RangeSelects[0].id}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select an Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Accounts</SelectLabel>
          {RangeSelects.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DateRangeSelect;
