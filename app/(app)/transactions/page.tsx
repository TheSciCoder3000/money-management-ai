import TransactionTable from "@/components/TransactionTable";
import React from "react";

function Transactions() {
  return (
    <div className="p-7">
      <h1 className="mb-8 text-4xl">Transactions</h1>
      <TransactionTable />
    </div>
  );
}

export default Transactions;
