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
    name: item.name,
    budget: item.budget,
  }));

  return (
    <div className="col-span-2">
      <TransactionTable
        items={items}
        Header={(key, indx) => (
          <TableHead
            className={clsx(
              indx === 0 && "max-w-[50px]",
              indx > 3 && "text-right",
            )}
            key={indx}
          >
            {["Id", "Name", "Limit"][indx]}
          </TableHead>
        )}
        Filter={() => true}
        render={(indx, value, key, TableCell) => {
          if (indx === 0)
            return (
              <TableCell className="max-w-[50px] overflow-hidden font-medium">
                {value as string}
              </TableCell>
            );
          if (key === "budget")
            return <TableCell>{ParseCash(value as number | null)}</TableCell>;
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
          />
        )}
      />
    </div>
  );
};

export default BudgetTable;
