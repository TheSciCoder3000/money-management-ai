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
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Income",
        data: [800, 1000, 950, 1200, 1100, 1300, 1250],
        borderColor: "rgba(34,197,94,1)", // green
        backgroundColor: "rgba(34,197,94,0.3)",
        fill: true,
        tension: 0.4, // smooth curve
      },
      {
        label: "Expenses",
        data: [1200, 1400, 1100, 1600, 1500, 1700, 1800],
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
    <div
      className={cn(
        "flex h-75 w-full flex-col rounded-md bg-white p-4 shadow-sm",
        className,
      )}
    >
      <h1 className="text-gray-500">Income vs Expenses</h1>
      <div className="flex h-full flex-1 items-center justify-center">
        <Line
          style={{ height: "100%" }}
          className="h-40"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default IncomeExpensesChart;
