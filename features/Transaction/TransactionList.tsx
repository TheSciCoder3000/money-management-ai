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
  const { categories } = useAppSelector((state) => state.category);
  const { transactions } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();

  const items = transactions.map((item) => {
    const account = accounts.find((acc) => acc.id === item.account_id);
    const category = categories.find((cat) => cat.id === item.category_id);
    return {
      id: item.id,
      account: {
        id: account?.id || "",
        name: account?.name || "",
      },
      paymentMethod: "Cash",
      category: {
        id: category?.id,
        name: category?.name,
      },
      note: item.note,
      amount: item.value,
      type: item.type,
    };
  });

  const handleRefresh = () => {
    dispatch(fetchTransactons());
  };

  const customFilter = (
    item: (typeof items)[0],
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
        const headers = [
          "Invoice",
          "Account",
          "Method",
          "Category",
          "Note",
          "Amount",
        ];
        if (key === "type") return <></>;
        return (
          <TableHead
            className={clsx(
              indx === 0 && "max-w-[50px]",
              indx === headers.length - 1 && "text-right",
            )}
            key={indx}
          >
            {headers[indx]}
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
        if (key === "category")
          return <TableCell>{(value as { name: string }).name}</TableCell>;
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
          <Cell colSpan={5}>Total</Cell>
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
