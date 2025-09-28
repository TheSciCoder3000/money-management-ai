"use client";

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import ContainerHeader from "@/features/Dashboard/ContainerHeader";
import DateRangeSelect from "@/components/DateRangeSelect";
import { useAppSelector } from "@/redux/store";
import { format, isSameDay } from "date-fns";
import { getDatesOfThisWeek } from "@/lib/date-utils";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface IncomeExpenseChartProps {
  account: IAccountDb;
}
const IncomeExpenseChart = ({
  className,
  account,
  ...props
}: React.ComponentProps<"div"> & IncomeExpenseChartProps) => {
  const { transactions } = useAppSelector((state) => state.transaction);
  const { categories } = useAppSelector((state) => state.category);
  const [range, setRange] = useState<Date[]>(getDatesOfThisWeek());

  const items = transactions.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));

  const labels = range.map((item) => format(item, "MMM dd"));

  const filter = (
    i: (typeof items)[0],
    date: Date,
    type: "income" | "expenses" | "transfer",
  ) => {
    const category = categories.find((item) => item.id === i.category_id)?.type;
    const sameDay = isSameDay(date, i.created_at);
    return category === type && sameDay && account.id === i.account_id;
  };

  const incomeData = range.map(
    (date) =>
      items
        .filter((i) => filter(i, date, "income"))
        .reduce((sum, i) => sum + i.value, 0), // total income for this date
  );

  const expenseData = range.map(
    (date) =>
      items
        .filter((i) => filter(i, date, "expenses"))
        .reduce((sum, i) => sum + i.value, 0), // total expenses for this date
  );

  const transferData = range.map(
    (date) =>
      items
        .filter((i) => filter(i, date, "transfer"))
        .reduce((sum, i) => sum + i.value, 0), // total expenses for this date
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        borderColor: "rgba(34,197,94,1)", // green
        backgroundColor: "rgba(34,197,94,0.3)",
        fill: true,
        tension: 0.4, // smooth curve
      },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "rgba(239,68,68,1)", // red
        backgroundColor: "rgba(239,68,68,0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Transfer",
        data: transferData,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Income vs Expenses (Area Chart)",
      },
    },
  };

  return (
    <Container className={cn(className)} {...props}>
      <ContainerHeader>Income vs Expenses</ContainerHeader>
      <div className="flex justify-end">
        <DateRangeSelect onChange={setRange} />
      </div>
      <Line className="p-2" data={data} options={options} />
    </Container>
  );
};

export default IncomeExpenseChart;
