"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { cn } from "@/lib/utils";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const IncomeExpenseChart = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Income",
        data: [5000, 6000, 5500, 7000, 6500],
        backgroundColor: "rgba(75, 192, 192, 0.7)", // teal
      },
      {
        label: "Expenses",
        data: [3000, 4000, 3500, 4200, 3900],
        backgroundColor: "rgba(255, 99, 132, 0.7)", // red
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income vs Expenses",
      },
    },
  };

  return (
    <div
      className={cn("flex h-80 w-full justify-center", className)}
      {...props}
    >
      <Bar data={data} options={options} className="flex items-center" />
    </div>
  );
};

export default IncomeExpenseChart;
