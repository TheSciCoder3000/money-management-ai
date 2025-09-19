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
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Income vs Expenses (Area Chart)",
      },
    },
  };

  return (
    <Container className={cn("h-75", className)}>
      <ContainerHeader>Income vs Expenses</ContainerHeader>
      <div className="flex h-full flex-1 items-center justify-center">
        <Line
          style={{ height: "100%" }}
          className="h-40"
          data={data}
          options={options}
        />
      </div>
    </Container>
  );
};

export default IncomeExpensesChart;
