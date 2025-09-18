"use client";

import React, { ReactNode, useState } from "react";

import MainTable from "./MainTable";
import AccountSelect from "./AccountSelect";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { RefreshCw } from "lucide-react";
interface TransactionTableProps<T extends { id: string }> {
  filterAccount?: boolean;
  items: T[];
  Filter: (item: T, query: string, accountId: string | null) => boolean;
  onRefresh?: () => void;
  render: (
    indx: number,
    value: T[keyof T],
    key: keyof T,
    Cell: typeof TableCell,
    item: T,
  ) => ReactNode;
  AddDialog?: ReactNode;
  EditDialog?: (item: T) => ReactNode;
  DeleteDialog?: (item: T) => ReactNode;
  Footer?: (items: T[], Cell: typeof TableCell) => ReactNode;
  Header: (key: keyof T, indx: number) => ReactNode;
}

const TransactionTable = <T extends { id: string }>({
  className,
  items,
  filterAccount = true,
  onRefresh,
  render,
  Filter,
  EditDialog,
  DeleteDialog,
  AddDialog,
  Footer,
  Header,
  ...props
}: React.ComponentProps<"div"> & TransactionTableProps<T>) => {
  const [query, setQuery] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);

  const handleRefresh = () => onRefresh && onRefresh();

  return (
    <Container className={cn("h-fit min-h-full", className)} {...props}>
      <div className="flex gap-2">
        {AddDialog && AddDialog}
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
      <MainTable
        Header={Header}
        render={render}
        items={items}
        filter={(itemFilter) => Filter(itemFilter, query, accountId)}
        EditDialog={EditDialog}
        DeleteDialog={DeleteDialog}
        Footer={Footer}
      />
    </Container>
  );
};

export default TransactionTable;
