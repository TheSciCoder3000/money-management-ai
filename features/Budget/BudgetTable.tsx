"use client";

import TransactionTable from "@/components/TransactionTable";
import { TableHead } from "@/components/ui/table";
import { ParseCash } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import clsx from "clsx";
import React, { useState } from "react";
import AddDialog from "./BudgetTable/AddDialog";
import DeleteDialog from "./BudgetTable/DeleteDialog";
import EditDialog from "./BudgetTable/EditDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BudgetTable = () => {
  const { categories } = useAppSelector((state) => state.category);
  const [type, setType] = useState("all");
  const items = categories.map((item) => ({
    id: item.id,
    color: item.color,
    name: item.name,
    type: item.type,
    budget: item.budget,
    total: item.total,
  }));

  return (
    <div className="col-span-3 row-span-3">
      <TransactionTable
        items={items}
        Header={(key, indx) => {
          if (key === "id") return <></>;
          const cols = ["id", "Color", "Name", "Type", "Limit", "Amount"];
          return (
            <TableHead
              className={clsx(
                key === "color" && "w-[100px]",
                indx === cols.length - 1 && "text-right",
              )}
              key={indx}
            >
              {cols[indx]}
            </TableHead>
          );
        }}
        Filter={(item, query) => {
          const regex = new RegExp(query, "i");
          const matched = regex.test(item.name);
          return matched && (item.type === type || type === "all");
        }}
        render={(indx, value, key, TableCell) => {
          if (key === "id") return <></>;
          if (key === "color")
            return (
              <TableCell>
                <div
                  className="aspect-square h-4 w-4"
                  style={{ backgroundColor: value as string }}
                />
              </TableCell>
            );
          if (key === "name")
            return (
              <TableCell className="max-w-[50px] overflow-hidden font-medium">
                {value as string}
              </TableCell>
            );
          if (key === "type") return <TableCell>{value as string}</TableCell>;
          if (key === "budget")
            return <TableCell>{ParseCash(value as number | null)}</TableCell>;
          if (key === "total")
            return (
              <TableCell className="text-right">
                {ParseCash(value as number)}
              </TableCell>
            );
          return <TableCell>{value as string}</TableCell>;
        }}
        AddDialog={<AddDialog />}
        DeleteDialog={(item) => <DeleteDialog id={item.id} />}
        EditDialog={(item) => (
          <EditDialog
            category_id={item.id}
            name={item.name}
            budget={item.budget}
            color={item.color}
            type={item.type}
          />
        )}
        Footer={(items, Cell) => {
          return (
            <>
              <Cell colSpan={3} className="font-bold">
                Total
              </Cell>
              <Cell className="font-bold">
                {ParseCash(
                  items.reduce((total, prev) => total + (prev.budget ?? 0), 0),
                )}
              </Cell>
              <Cell className="text-right font-bold">
                {ParseCash(
                  items.reduce((total, prev) => total + prev.total, 0),
                )}
              </Cell>
              <Cell />
            </>
          );
        }}
        Selects={
          <Select defaultValue="all" onValueChange={setType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                <SelectItem value="all">All Types</SelectItem>
                {["expenses", "income"].map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
};

export default BudgetTable;
