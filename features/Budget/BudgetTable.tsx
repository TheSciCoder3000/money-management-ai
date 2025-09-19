"use client";

import TransactionTable from "@/components/TransactionTable";
import { TableHead } from "@/components/ui/table";
import { ParseCash } from "@/lib/utils";
import { useAppSelector } from "@/redux/store";
import clsx from "clsx";
import React from "react";
import AddDialog from "./BudgetTable/AddDialog";
import DeleteDialog from "./BudgetTable/DeleteDialog";
import EditDialog from "./BudgetTable/EditDialog";

const BudgetTable = () => {
  const { categories } = useAppSelector((state) => state.category);
  const items = categories.map((item) => ({
    id: item.id,
    color: item.color,
    name: item.name,
    budget: item.budget,
    total: item.total,
  }));

  return (
    <div className="col-span-2">
      <TransactionTable
        items={items}
        Header={(key, indx) => {
          if (key === "id") return <></>;
          const cols = ["id", "Color", "Name", "Limit", "Amount"];
          return (
            <TableHead
              className={clsx(
                indx === 0 && "max-w-[50px]",
                indx === cols.length - 1 && "text-right",
              )}
              key={indx}
            >
              {cols[indx]}
            </TableHead>
          );
        }}
        Filter={() => true}
        render={(indx, value, key, TableCell) => {
          if (key === "id") return <></>;
          if (key === "color")
            return (
              <TableCell className="justify-left flex items-center">
                <div
                  className="aspect-square h-4 w-4"
                  style={{ backgroundColor: value as string }}
                ></div>
              </TableCell>
            );
          if (key === "name")
            return (
              <TableCell className="max-w-[50px] overflow-hidden font-medium">
                {value as string}
              </TableCell>
            );
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
        filterAccount={false}
        AddDialog={<AddDialog />}
        DeleteDialog={(item) => <DeleteDialog id={item.id} />}
        EditDialog={(item) => (
          <EditDialog
            category_id={item.id}
            name={item.name}
            budget={item.budget}
            color={item.color}
          />
        )}
        Footer={(items, Cell) => {
          return (
            <>
              <Cell colSpan={2} className="font-bold">
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
      />
    </div>
  );
};

export default BudgetTable;
