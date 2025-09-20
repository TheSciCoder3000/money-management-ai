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

interface TransactionTypeSelectProps {
  onChange?: (value: TransactionType | null) => void;
}
const TransactionTypeSelect: React.FC<TransactionTypeSelectProps> = ({
  onChange,
}) => {
  return (
    <Select
      onValueChange={(value) =>
        onChange &&
        onChange(value === "all" ? null : (value as TransactionType))
      }
      defaultValue="all"
    >
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Select an Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type</SelectLabel>
          <SelectItem value="all">All Types</SelectItem>
          {(["income", "expenses", "transfer"] as TransactionType[]).map(
            (item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ),
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TransactionTypeSelect;
