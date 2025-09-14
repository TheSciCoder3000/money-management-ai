"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface AccountListProps {
  className?: string;
}
const AccountList: React.FC<AccountListProps> = ({ className }) => {
  return (
    <div className={cn("w-full rounded-md bg-white p-4 shadow-sm", className)}>
      <h1 className="text-gray-500">Accounts</h1>
    </div>
  );
};

export default AccountList;
