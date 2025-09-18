"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchTransactons } from "@/redux/transaction/TransactionThunk";
import TransactionTable from "@/components/TransactionTable";
import DeleteDialog from "@/features/Transaction/DeleteDialog";
import EditDialog from "@/features/Transaction/EditDialog";
import AddDialog from "@/features/Transaction/AddDialog";
import { cn, ParseCash } from "@/lib/utils";
import { TableHead } from "@/components/ui/table";
import clsx from "clsx";

const TransactionList = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { accounts } = useAppSelector((state) => state.account);
  const { transactions } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();

  const items: TableDataSchema[] = transactions.map((item) => {
    const account = accounts.find((acc) => acc.id === item.account_id);
    return {
      id: item.id,
      account: {
        id: account?.id || "",
        name: account?.name || "",
      },
      paymentMethod: "Cash",
      note: item.note,
      amount: item.value,
      type: item.type,
    } satisfies TableDataSchema;
  });

  const handleRefresh = () => {
    dispatch(fetchTransactons());
  };

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
    <TransactionTable
      Header={(key, indx) => {
        if (key === "type") return <></>;
        return (
          <TableHead
            className={clsx(
              indx === 0 && "max-w-[50px]",
              indx > 3 && "text-right",
            )}
            key={indx}
          >
            {["Invoice", "Account", "Method", "Note", "Amount"][indx]}
          </TableHead>
        );
      }}
      Filter={customFilter}
      render={(indx, value, key, TableCell) => {
        if (key === "type") return <></>;
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
      onRefresh={handleRefresh}
      items={items}
      className={cn(className)}
      AddDialog={<AddDialog />}
      EditDialog={(item) => (
        <EditDialog
          transaction_id={item.id}
          paymentMethod="Cash"
          account_id={item.account.id}
          amount={item.amount}
          note={item.note}
          type={item.type}
        />
      )}
      DeleteDialog={(item) => <DeleteDialog id={item.id} />}
      Footer={(invoices, Cell) => (
        <>
          <Cell colSpan={4}>Total</Cell>
          <Cell className="text-right">
            {ParseCash(
              invoices.reduce(
                (prev, item) =>
                  prev + item.amount * (item.type === "expenses" ? -1 : 1),
                0,
              ),
            )}
          </Cell>
          <Cell />
        </>
      )}
      {...props}
    />
  );
};

export default TransactionList;
