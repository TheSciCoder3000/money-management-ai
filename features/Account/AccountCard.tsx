import { ParseCash } from "@/lib/utils";
import React from "react";

interface AccountCardProps {
  id: string;
  name: string;
  type: string;
  amount: number;
}
const AccountCard: React.FC<AccountCardProps> = ({ name, type, amount }) => {
  return (
    <div className="flex h-40 w-full flex-col justify-between rounded-md bg-white p-4 shadow-sm">
      <div>
        <h2 className="text-xl">{name}</h2>
        <h3 className="text-gray-400">{type}</h3>
      </div>

      <h1 className="text-2xl">$ {ParseCash(amount)}</h1>
    </div>
  );
};

export default AccountCard;
