"use client";

import Container from "@/components/Container";
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
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const BalanceTrend = () => {
  const labels = ["2025-09-01", "2025-09-05", "2025-09-10", "2025-09-15"];
  const data = {
    labels,
    datasets: [
      {
        label: "Balance (₱)",
        data: [5000, 6200, 4800, 7200], // balances over time
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3, // smooth curve
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Money Balance Trend" },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container className="h-90 justify-center">
      <Line options={options} data={data} />
    </Container>
  );
};

export default BalanceTrend;
