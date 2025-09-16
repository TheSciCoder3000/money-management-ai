import BalanceTrend from "@/features/Budget/BalanceTrend";
import BudgetChart from "@/features/Budget/BudgetChart";
import BudgetTable from "@/features/Budget/BudgetTable";
import React from "react";

const Budget = () => {
  return (
    <div className="p-7">
      <h1 className="mb-8 text-4xl">Budget</h1>
      <div className="grid grid-cols-2 gap-4">
        <BalanceTrend />
        <BudgetChart />
        <BudgetTable />
      </div>
    </div>
  );
};

export default Budget;
