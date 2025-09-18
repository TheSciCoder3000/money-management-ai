"use client";

import TransactionTable from "@/components/TransactionTable";
import { TableHead } from "@/components/ui/table";
import { ParseCash } from "@/lib/utils";
import clsx from "clsx";
import React from "react";

const BudgetTable = () => {
  const customFilter = (
    item: TableDataSchema,
    query: string,
    accountId: string | null,
  ) => {
    const regex = new RegExp(query, "i");
    const matched = regex.test(item.id) || regex.test(item.note || "");

    if (!accountId) return matched;
    return item.account.id === accountId && matched;
  };

  return (
    <div className="col-span-2">
      <TransactionTable
        Header={(key, indx) => (
          <TableHead
            className={clsx(
              indx === 0 && "max-w-[50px]",
              indx > 3 && "text-right",
            )}
            key={indx}
          >
            {["Invoice", "Account", "Method", "Note", "Amount"][indx]}
          </TableHead>
        )}
        Filter={customFilter}
        render={(indx, value, key, TableCell) => {
          if (indx === 0)
            return (
              <TableCell className="max-w-[50px] overflow-hidden font-medium">
                {value as string}
              </TableCell>
            );
          if (key === "account")
            return <TableCell>{(value as AccountType).name}</TableCell>;
          if (key === "amount")
            return (
              <TableCell className="text-right">
                {ParseCash(value as number)}
              </TableCell>
            );
          return <TableCell>{value as string}</TableCell>;
        }}
        filterAccount={false}
        items={[]}
      />
    </div>
  );
};

export default BudgetTable;
