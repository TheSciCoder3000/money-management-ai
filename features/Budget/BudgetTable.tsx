"use client";

import TransactionTable from "@/components/TransactionTable";
import { TableHead } from "@/components/ui/table";
import { ParseCash } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

const fakeData = [
  {
    id: "0",
    name: "Electricity",
    limit: 3000,
  },
  {
    id: "1",
    name: "Electricity",
    limit: 3000,
  },
  {
    id: "2",
    name: "Electricity",
    limit: 3000,
  },
];

const BudgetTable = () => {
  return (
    <div className="col-span-2">
      <TransactionTable
        items={fakeData}
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
          if (key === "limit")
            return <TableCell>{ParseCash(value as number)}</TableCell>;
          return <TableCell>{value as string}</TableCell>;
        }}
        filterAccount={false}
      />
    </div>
  );
};

export default BudgetTable;
