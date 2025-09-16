"use client";

import React from "react";
import TransactionTable from "@/components/TransactionTable";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchTransactons } from "@/redux/transaction/TransactionThunk";

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
      invoice: item.id,
      account: {
        id: account!.id,
        name: account!.name,
      },
      amount: item.value,
      paymentMethod: "Cash",
      note: item.note,
    } satisfies TableDataSchema;
  });

  const handleRefresh = () => {
    dispatch(fetchTransactons());
  };

  return (
    <TransactionTable
      onRefresh={handleRefresh}
      items={items}
      {...props}
      className={cn(className)}
    />
  );
};

export default TransactionList;
