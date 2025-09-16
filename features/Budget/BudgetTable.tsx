import TransactionTable from "@/components/TransactionTable";
import React from "react";

const BudgetTable = () => {
  return (
    <div className="col-span-2">
      <TransactionTable items={[]} />
    </div>
  );
};

export default BudgetTable;
