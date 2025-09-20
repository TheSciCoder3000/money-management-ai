"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // enables area fill
} from "chart.js";
import { Line } from "react-chartjs-2";
import Container from "@/components/Container";
import ContainerHeader from "./ContainerHeader";
import { useAppSelector } from "@/redux/store";
import { format } from "date-fns";

// Register required components
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

interface IncomeExpensesChartProps {
  className?: string;
}
const IncomeExpensesChart: React.FC<IncomeExpensesChartProps> = ({
  className,
}) => {
  const { transactions } = useAppSelector((state) => state.transaction);
  const { categories } = useAppSelector((state) => state.category);

  const items = transactions.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));

  const labels = Array.from(
    new Set(items.map((item) => format(item.created_at, "dd"))),
  ).sort();

  const incomeData = labels.map(
    (date) =>
      items
        .filter(
          (i) =>
            categories.find((item) => item.id === i.category_id)?.type ===
              "income" && format(i.created_at, "dd") === date,
        )
        .reduce((sum, i) => sum + i.value, 0), // total income for this date
  );

  const expenseData = labels.map(
    (date) =>
      items
        .filter(
          (i) =>
            categories.find((item) => item.id === i.category_id)?.type ===
              "expenses" && format(i.created_at, "dd") === date,
        )
        .reduce((sum, i) => sum + i.value, 0), // total expenses for this date
  );

  const data = {
    labels,
    datasets: [
      // {
      //   label: "Income",
      //   data: incomeData,
      //   borderColor: "rgba(34,197,94,1)", // green
      //   backgroundColor: "rgba(34,197,94,0.3)",
      //   fill: true,
      //   tension: 0.4, // smooth curve
      // },
      {
        label: "Expenses",
        data: expenseData,
        borderColor: "rgba(239,68,68,1)", // red
        backgroundColor: "rgba(239,68,68,0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Income vs Expenses (Area Chart)",
      },
    },
  };

  return (
    <Container className={cn(className)}>
      <ContainerHeader>Income vs Expenses</ContainerHeader>
      <Line className="p-2" data={data} options={options} />
    </Container>
  );
};

export default IncomeExpensesChart;
