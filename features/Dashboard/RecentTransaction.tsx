"use client";

import { cn, ParseCash } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

const fakeData = [
  {
    id: "0",
    name: "allowance",
    source: "Wallet",
    type: "income",
    amount: 10000,
  },
  {
    id: "1",
    name: "External Antenna",
    source: "Bank",
    type: "expenses",
    amount: 1000,
  },
  {
    id: "2",
    name: "Bread",
    source: "Wallet",
    type: "expenses",
    amount: 150,
  },
  {
    id: "3",
    name: "Water",
    source: "Wallet",
    type: "expenses",
    amount: 225,
  },
  {
    id: "4",
    name: "Electricity",
    source: "Wallet",
    type: "expenses",
    amount: 1250,
  },
];

interface RecentTransactionProps {
  className?: string;
}
const RecentTransaction: React.FC<RecentTransactionProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-75 w-full flex-col overflow-hidden rounded-md bg-white p-4 shadow-sm",
        className,
      )}
    >
      <h1 className="mb-2 text-gray-500">Recent Transaction</h1>
      <div className="relative flex flex-1 flex-col gap-2 overflow-auto">
        {fakeData.map((item) => (
          <div
            key={item.id}
            className="flex w-full items-center justify-between"
          >
            <div>
              <h2 className="text-sm">{item.name}</h2>
              <h3 className="text-xs text-gray-400">{item.source}</h3>
            </div>

            <div
              className={clsx(
                "",
                item.type === "income" ? "text-green-500" : "text-red-500",
              )}
            >
              <p>$ {ParseCash(item.amount)}</p>
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
    </div>
  );
};

export default RecentTransaction;
