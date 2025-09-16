import TransactionList from "@/features/Transaction/TransactionList";
import React from "react";

function Transactions() {
  return (
    <div className="p-7">
      <h1 className="mb-8 text-4xl">Transactions</h1>
      <TransactionList />
    </div>
  );
}

export default Transactions;
