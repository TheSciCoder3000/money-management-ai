"use client";

import { cn, ParseCash } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const fakeData = [
  {
    id: "0",
    name: "Wallet",
    type: "Cash",
    amount: 5000,
  },
  {
    id: "1",
    name: "BDO",
    type: "Bank",
    amount: 10000,
  },
];
interface AccountListProps {
  className?: string;
}
const AccountList: React.FC<AccountListProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex h-75 w-full flex-col rounded-md bg-white p-4 shadow-sm",
        className,
      )}
    >
      <h1 className="mb-2 text-gray-500">Accounts</h1>
      <div className="relative flex flex-1 flex-col gap-2 overflow-auto">
        {fakeData.map((item) => (
          <div
            key={item.id}
            className="flex w-full items-center justify-between"
          >
            <div>
              <h2 className="text-sm">{item.name}</h2>
              <h3 className="text-xs text-gray-400">{item.type}</h3>
            </div>

            <div>
              <p>$ {ParseCash(item.amount)}</p>
            </div>
          </div>
        ))}

        <Link
          href={"/account"}
          className="absolute bottom-0 left-0 block w-full cursor-pointer text-center text-xs text-gray-500 hover:text-gray-700"
        >
          More
        </Link>
      </div>
    </div>
  );
};

export default AccountList;
