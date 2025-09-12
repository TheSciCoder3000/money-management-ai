import BudgetLimit from "@/features/Dashboard/BudgetLimit";
import ExpenditureBreakdown from "@/features/Dashboard/ExpenditureBreakdown";
import IncomeExpensesChart from "@/features/Dashboard/IncomeExpensesChart";
import OverviewCard from "@/features/Dashboard/OverviewCard";
import RecentTransaction from "@/features/Dashboard/RecentTransaction";
import React from "react";

export default function Home() {
  return (
    <div className="grid w-full grid-cols-4 gap-4 overscroll-y-auto p-7">
      <OverviewCard
        className="col-span-4"
        total={1000}
        expenses={120}
        income={1120}
      />
      <BudgetLimit className="col-span-2" />
      <IncomeExpensesChart className="col-span-2 row-start-3" />
      <ExpenditureBreakdown />
      <RecentTransaction className="col-start-4 row-span-2" />
    </div>
  );
}
