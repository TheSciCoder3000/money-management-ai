"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AccountSelectProps {
  items: { id: string; name: string }[];
  onChange?: (value: string | null) => void;
}
const AccountSelect: React.FC<AccountSelectProps> = ({ items, onChange }) => {
  return (
    <Select
      onValueChange={(value) =>
        onChange && onChange(value === "all" ? null : value)
      }
      defaultValue="all"
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select an Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Accounts</SelectLabel>
          <SelectItem value="all">All Accounts</SelectItem>
          {items.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AccountSelect;
