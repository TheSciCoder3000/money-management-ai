import AccountList from "@/features/Dashboard/AccountList";
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

      <IncomeExpensesChart className="col-span-3 row-span-3" />
      <BudgetBreakdown />
      <RecentTransaction />
      <AccountList />
      <Controls />
    </div>
  );
}
