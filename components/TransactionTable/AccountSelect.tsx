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
import { useAppSelector } from "@/redux/store";

interface AccountSelectProps {
  onChange?: (value: string | null) => void;
}
const AccountSelect: React.FC<AccountSelectProps> = ({ onChange }) => {
  const { accounts } = useAppSelector((state) => state.account);

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
          {accounts.map((item) => (
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
