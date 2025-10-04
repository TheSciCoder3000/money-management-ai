import AccountList from "@/features/Dashboard/AccountList";
import BudgetBreakdown from "@/features/Dashboard/BudgetBreakdown";
import IncomeExpensesChart from "@/features/Dashboard/IncomeExpensesChart";
import OverviewCard from "@/features/Dashboard/OverviewCard";
import RecentTransaction from "@/features/Dashboard/RecentTransaction";
import React from "react";

export default function Home() {
  return (
    <div className="relative grid w-full grid-cols-1 gap-4 overscroll-y-auto p-7 md:grid-cols-3 lg:grid-cols-4">
      <OverviewCard className="col-span-1 justify-between md:col-span-3 lg:col-span-4" />

      <IncomeExpensesChart className="row-span-3 hidden md:col-span-3 md:flex" />
      <BudgetBreakdown />
      <RecentTransaction />
      <AccountList />
    </div>
  );
}
