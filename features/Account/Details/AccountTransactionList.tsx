"use client";

import React, { useState } from "react";
import clsx from "clsx";
import TransactionTable from "@/components/TransactionTable";
import { TableCell, TableHead } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { isBeforeOrEqual, ParseCash } from "@/lib/utils";
import AddDialog from "./AddDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "@/features/Transaction/DeleteDialog";
import TransactionTypeSelect from "@/components/TransactionTable/TransactionTypeSelect";
import { fetchTransactons } from "@/redux/transaction/TransactionThunk";
import { format } from "date-fns";
import DateRangePicker from "@/components/DateRangePicker";
import { DateRange } from "react-day-picker";

interface AccountTransactionListProps {
  account: IAccountDb;
}
const AccountTransactionList: React.FC<AccountTransactionListProps> = ({
  account,
}) => {
  const { transactions } = useAppSelector((state) => state.transaction);
  const { categories } = useAppSelector((state) => state.category);
  const { accounts } = useAppSelector((state) => state.account);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const dispatch = useAppDispatch();
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);

  const items = transactions
    .filter(
      (item) =>
        item.account_id === account.id || item.target_account_id === account.id,
    )
    .map((item) => ({
      id: item.id,
      target: accounts.find((acc) => acc.id === item.target_account_id),
      category: categories.find((cat) => cat.id === item.category_id),
      date: item.created_at,
      note: item.note,
      amount: item.value,
    }));

  const customFilter = (item: (typeof items)[0], query: string) => {
    const regex = new RegExp(query, "i");
    const matched = regex.test(item.id) || regex.test(item.note || "");

    const typeMatched =
      transactionType === null || item.category?.type === transactionType;

    const startDate = dateRange?.from;
    const endDate = dateRange?.to;
    const itemDate = new Date(item.date);
    const dateMatched =
      dateRange === undefined ||
      (!!startDate &&
        !!endDate &&
        isBeforeOrEqual(startDate, itemDate) &&
        isBeforeOrEqual(itemDate, endDate));

    return matched && typeMatched && dateMatched;
  };

  return (
    <TransactionTable
      items={items}
      Header={(key, indx) => {
        if (key === "id") return <></>;
        if (key === "target") return;
        return (
          <TableHead
            className={clsx(
              indx === 0 && "max-w-[50px]",
              indx > 3 && "text-right",
            )}
            key={indx}
          >
            {["Invoice", "target", "Category", "Date", "Note", "Amount"][indx]}
          </TableHead>
        );
      }}
      render={(indx, value, key, DataCell, item) => {
        if (key === "id") return <></>;
        if (key === "target") return;
        if (key === "category")
          return <TableCell>{(value as ICategoryDb | null)?.name}</TableCell>;
        if (key === "amount")
          return (
            <TableCell
              className={clsx(
                "text-right",
                item.category?.type === "income" ||
                  item.target?.id === account.id
                  ? "text-green-600"
                  : "text-red-500",
              )}
            >
              {ParseCash(value as number)}
            </TableCell>
          );
        if (key === "date")
          return (
            <TableCell className="text-gray-400">
              {format(new Date(value as string), "MMM dd, yyyy")}
            </TableCell>
          );
        if (item.category?.type === "transfer")
          return (
            <TableCell>
              <span className="font-bold">To {item.target?.name}:</span>{" "}
              {value as string}
            </TableCell>
          );
        return <DataCell>{value as string}</DataCell>;
      }}
      Filter={customFilter}
      className="col-span-4"
      AddDialog={<AddDialog account={account} />}
      EditDialog={(item) => (
        <EditDialog
          note={item.note}
          amount={item.amount}
          account={account}
          transaction_id={item.id}
          category_id={item.category?.id}
          type={item.category?.type}
          target={item.target?.id}
        />
      )}
      DeleteDialog={(item) => <DeleteDialog id={item.id} />}
      Footer={(invoices, Cell) => (
        <>
          <Cell colSpan={3}>Total</Cell>
          <Cell className="text-right">
            {ParseCash(
              invoices.reduce(
                (prev, item) =>
                  prev +
                  item.amount *
                    (item.category?.type === "income" ||
                    item.target?.id === account.id
                      ? 1
                      : -1),
                0,
              ),
            )}
          </Cell>
          <Cell />
        </>
      )}
      onRefresh={() => dispatch(fetchTransactons())}
      Selects={
        <>
          <TransactionTypeSelect onChange={setTransactionType} />
          <DateRangePicker onValueChange={setDateRange} />
        </>
      }
    />
  );
};

export default AccountTransactionList;
