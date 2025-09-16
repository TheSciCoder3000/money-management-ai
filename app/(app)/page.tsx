import AccountList from "@/features/Dashboard/AccountList";
import ExpensesLimit from "@/features/Dashboard/ExpensesLimit";
import Controls from "@/features/Dashboard/Controls";
import BudgetBreakdown from "@/features/Dashboard/BudgetBreakdown";
import IncomeExpensesChart from "@/features/Dashboard/IncomeExpensesChart";
import OverviewCard from "@/features/Dashboard/OverviewCard";
import RecentTransaction from "@/features/Dashboard/RecentTransaction";
import React from "react";

export default function Home() {
  return (
    <div className="relative grid w-full grid-cols-4 gap-4 overscroll-y-auto p-7">
      <OverviewCard className="col-span-4 justify-between" />
      <BudgetBreakdown />
      <ExpensesLimit className="col-span-2" />
      <RecentTransaction />
      <AccountList />
      <IncomeExpensesChart className="col-span-2" />
      <Controls />
    </div>
  );
}
