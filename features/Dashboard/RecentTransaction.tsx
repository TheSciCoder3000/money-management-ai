"use client";

import Container from "@/components/Container";
import { cn, ParseCash } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import ContainerHeader from "./ContainerHeader";
import { useAppSelector } from "@/redux/store";

interface RecentTransactionProps {
  className?: string;
}
const RecentTransaction: React.FC<RecentTransactionProps> = ({ className }) => {
  const { transactions } = useAppSelector((state) => state.transaction);
  const { accounts } = useAppSelector((state) => state.account);

  return (
    <Container className={cn("h-75", className)}>
      <ContainerHeader>Recent Transaction</ContainerHeader>
      <div className="relative flex flex-1 flex-col gap-2 overflow-auto">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex w-full items-center justify-between"
          >
            <div>
              <h2 className="text-sm">{item.note}</h2>
              <h3 className="text-xs text-gray-400">
                {accounts.find((acc) => acc.id === item.account_id)?.name}
              </h3>
            </div>

            <div
              className={clsx(
                "",
                item.type === "income" ? "text-green-500" : "text-red-500",
              )}
            >
              <p>{ParseCash(item.value)}</p>
            </div>
          </div>
        ))}

        <Link
          href={"/transactions"}
          className="absolute bottom-0 left-0 block w-full cursor-pointer text-center text-xs text-gray-500 hover:text-gray-700"
        >
          More
        </Link>
      </div>
    </Container>
  );
};

export default RecentTransaction;
