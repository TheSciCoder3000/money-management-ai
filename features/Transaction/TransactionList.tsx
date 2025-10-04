"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchTransactons } from "@/redux/transaction/TransactionThunk";
import TransactionTable from "@/components/TransactionTable";
import DeleteDialog from "@/features/Transaction/DeleteDialog";
import EditDialog from "@/features/Transaction/EditDialog";
import AddDialog from "@/features/Transaction/AddDialog";
import { cn, ParseCash } from "@/lib/utils";
import { TableHead } from "@/components/ui/table";
import clsx from "clsx";
import AccountSelect from "@/components/TransactionTable/AccountSelect";
import TransactionTypeSelect from "@/components/TransactionTable/TransactionTypeSelect";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import DateRangePicker from "@/components/DateRangePicker";
import { isBeforeOrEqual } from "@/lib/date-utils";

const TransactionList = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { accounts } = useAppSelector((state) => state.account);
  const { categories } = useAppSelector((state) => state.category);
  const { transactions } = useAppSelector((state) => state.transaction);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);
  const dispatch = useAppDispatch();

  const items = transactions.map((item) => {
    const account = accounts.find((acc) => acc.id === item.account_id);
    const category = categories.find((cat) => cat.id === item.category_id);
    return {
      id: item.id,
      target: accounts.find((acc) => acc.id === item.target_account_id),
      account: {
        id: account?.id || "",
        name: account?.name || "",
      },
      category: {
        id: category?.id,
        name: category?.name,
        type: category?.type,
      },
      date: item.created_at,
      note: item.note,
      amount: item.value,
    };
  });

  const customFilter = (item: (typeof items)[0], query: string) => {
    const regex = new RegExp(query, "i");
    const matched = regex.test(item.id) || regex.test(item.note || "");

    const accountMatched = accountId === null || item.account.id === accountId;
    const typeMatched =
      transactionType === null || item.category.type === transactionType;

    const startDate = dateRange?.from;
    const endDate = dateRange?.to;
    const itemDate = new Date(item.date);
    const dateMatched =
      dateRange === undefined ||
      (!!startDate &&
        !!endDate &&
        isBeforeOrEqual(startDate, itemDate) &&
        isBeforeOrEqual(itemDate, endDate));

    return accountMatched && matched && typeMatched && dateMatched;
  };

  return (
    <TransactionTable
      items={items}
      Header={(key, indx) => {
        if (key === "id") return;
        if (key === "target") return;
        const headers = [
          "Invoice",
          "target",
          "Account",
          "Category",
          "Date",
          "Note",
          "Amount",
        ];
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
      render={(indx, value, key, TableCell, item) => {
        if (key === "target") return;
        if (key === "id") return;
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
        if (key === "date")
          return (
            <TableCell className="text-gray-400">
              {format(new Date(value as string), "MMM dd, yyyy")}
            </TableCell>
          );
        if (key === "amount")
          return (
            <TableCell
              className={clsx(
                "text-right",
                item.category.type === "income"
                  ? "text-green-600"
                  : item.category.type === "expenses"
                    ? "text-red-500"
                    : "text-gray-500",
              )}
            >
              {ParseCash(value as number)}
            </TableCell>
          );
        if (item.category.type === "transfer")
          return (
            <TableCell>
              <span className="font-bold">To {item.target?.name}:</span>{" "}
              {value as string}
            </TableCell>
          );
        return <TableCell>{value as string}</TableCell>;
      }}
      onRefresh={() => dispatch(fetchTransactons())}
      className={cn(className)}
      AddDialog={<AddDialog />}
      EditDialog={(item) => (
        <EditDialog
          transaction_id={item.id}
          category_id={item.category.id}
          account_id={item.account.id}
          amount={item.amount}
          note={item.note}
          type={item.category.type}
          target={item.target?.id}
        />
      )}
      DeleteDialog={(item) => <DeleteDialog id={item.id} />}
      Footer={(invoices, Cell) => (
        <>
          <Cell colSpan={4}>Total</Cell>
          <Cell className="text-right">
            {ParseCash(
              invoices
                .filter((item) => item.category.type !== "transfer")
                .reduce(
                  (prev, item) =>
                    prev +
                    item.amount * (item.category.type === "expenses" ? -1 : 1),
                  0,
                ),
            )}
          </Cell>
          <Cell />
        </>
      )}
      Selects={
        <>
          <AccountSelect className="col-span-2" onChange={setAccountId} />
          <TransactionTypeSelect
            className="col-span-2"
            onChange={setTransactionType}
          />
          <DateRangePicker
            className="col-span-2"
            onValueChange={setDateRange}
          />
        </>
      }
      {...props}
    />
  );
};

export default TransactionList;
