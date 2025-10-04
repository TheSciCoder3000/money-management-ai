"use client";

import React, { ReactNode, useState } from "react";

import MainTable from "./MainTable";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { RefreshCw } from "lucide-react";
interface TransactionTableProps<T extends { id: string }> {
  Selects?: ReactNode;
  items: T[];
  Filter: (item: T, query: string) => boolean;
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
  Selects,
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

  const handleRefresh = () => onRefresh && onRefresh();

  return (
    <Container className={cn("h-fit min-h-full", className)} {...props}>
      <div className="grid grid-cols-4 gap-2 md:flex">
        {AddDialog && AddDialog}

        <Button
          variant="outline"
          onClick={handleRefresh}
          className="col-span-1 cursor-pointer"
        >
          <RefreshCw />
        </Button>

        <Input
          className="col-span-full row-start-1"
          placeholder="Filter By..."
          onChange={(e) => setQuery(e.target.value)}
        />

        {Selects && Selects}
      </div>

      <MainTable
        Header={Header}
        render={render}
        items={items}
        filter={(itemFilter) => Filter(itemFilter, query)}
        EditDialog={EditDialog}
        DeleteDialog={DeleteDialog}
        Footer={Footer}
      />
    </Container>
  );
};

export default TransactionTable;
