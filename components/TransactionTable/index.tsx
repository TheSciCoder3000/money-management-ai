"use client";

import React, { useState } from "react";

import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import AccountSelect from "./AccountSelect";
import MainTable from "./MainTable";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";
import AddDialog from "./AddDialog";

interface TransactionTableProps {
  filterAccount?: boolean;
  items: TableDataSchema[];
  onRefresh?: () => void;
}
const TransactionTable = ({
  className,
  items,
  filterAccount = true,
  onRefresh,
  ...props
}: React.ComponentProps<"div"> & TransactionTableProps) => {
  const [query, setQuery] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);

  const handleRefresh = () => onRefresh && onRefresh();

  const customFilter = (item: TableDataSchema) => {
    const regex = new RegExp(query, "i");
    const matched = regex.test(item.invoice) || regex.test(item.note || "");

    if (!accountId) return matched;
    return item.account.id === accountId && matched;
  };

  return (
    <Container className={cn("h-fit min-h-full", className)} {...props}>
      <div className="flex gap-2">
        <AddDialog />
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="cursor-pointer"
        >
          <RefreshCw />
        </Button>
        <Input
          placeholder="Filter By..."
          onChange={(e) => setQuery(e.target.value)}
        />
        {filterAccount && <AccountSelect onChange={setAccountId} />}
      </div>
      <MainTable items={items} filter={customFilter} />
    </Container>
  );
};

export default TransactionTable;
