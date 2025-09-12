"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface RecentTransactionProps {
  className?: string;
}
const RecentTransaction: React.FC<RecentTransactionProps> = ({ className }) => {
  return (
    <div className={cn("w-full rounded-md bg-white p-4 shadow-sm", className)}>
      <h1 className="text-gray-500">Recent Transaction</h1>
    </div>
  );
};

export default RecentTransaction;
