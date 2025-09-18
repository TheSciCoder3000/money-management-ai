"use client";

import React from "react";
import clsx from "clsx";
import TransactionTable from "@/components/TransactionTable";
import { TableCell, TableHead } from "@/components/ui/table";
import { useAppSelector } from "@/redux/store";
import { ParseCash } from "@/lib/utils";
import AddDialog from "./AddDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "@/features/Transaction/DeleteDialog";

interface AccountTransactionListProps {
  account: IAccountDb;
}
const AccountTransactionList: React.FC<AccountTransactionListProps> = ({
  account,
}) => {
  const { transactions } = useAppSelector((state) => state.transaction);
  const { categories } = useAppSelector((state) => state.category);

  const items = transactions
    .filter((item) => item.account_id === account.id)
    .map((item) => ({
      id: item.id,
      paymentMethod: "Cash",
      category: categories.find((cat) => cat.id === item.category_id),
      note: item.note,
      amount: item.value,
      type: item.type,
    }));

  return (
    <TransactionTable
      items={items}
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
            {["Invoice", "Method", "Category", "Note", "Amount"][indx]}
          </TableHead>
        );
      }}
      render={(indx, value, key, DataCell) => {
        if (key === "type") return <></>;
        if (key === "category")
          return <TableCell>{(value as ICategoryDb).name}</TableCell>;
        if (key === "amount")
          return (
            <DataCell className="text-right">
              {ParseCash(value as number)}
            </DataCell>
          );
        return <DataCell>{value as string}</DataCell>;
      }}
      Filter={() => true}
      className="col-span-4"
      filterAccount={false}
      AddDialog={<AddDialog account={account} />}
      EditDialog={(item) => (
        <EditDialog
          paymentMethod="Cash"
          type={item.type}
          note={item.note}
          amount={item.amount}
          account={account}
          transaction_id={item.id}
          category_id={item.category?.id}
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
    />
  );
};

export default AccountTransactionList;
