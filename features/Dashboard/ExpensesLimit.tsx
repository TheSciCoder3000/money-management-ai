"use client";

import { cn } from "@/lib/utils";
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
import annotationPlugin from "chartjs-plugin-annotation";
import { Bar } from "react-chartjs-2";
import Container from "@/components/Container";
import ContainerHeader from "./ContainerHeader";

// Register required Chart.js components + plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

interface ExpensesLimitProps {
  className?: string;
}
const ExpensesLimit: React.FC<ExpensesLimitProps> = ({ className }) => {
  const data = {
    labels: ["Food", "Games", "Tech"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const, // horizontal bars
    responsive: true,
    plugins: {
      legend: { display: false },
      annotation: {
        annotations: {
          limitLine: {
            type: "line",
            xMin: 100,
            xMax: 100,
            borderColor: "red",
            borderWidth: 1,
            label: {
              display: true,
              content: "Limit",
              position: "end",
            },
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 150,
      },
    },
  };
  return (
    <Container className={cn(className)}>
      <ContainerHeader>Expenses</ContainerHeader>
      <Bar className="p-2" data={data} options={options} />
    </Container>
  );
};

export default ExpensesLimit;
