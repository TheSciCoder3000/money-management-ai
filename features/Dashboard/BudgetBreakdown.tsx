"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Container from "@/components/Container";
import ContainerHeader from "./ContainerHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetBreakdownProps {
  className?: string;
}
const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({ className }) => {
  return (
    <Container className={cn("h-75", className)}>
      <ContainerHeader>Budget Breakdown</ContainerHeader>

      <Doughnut
        className="p-4"
        data={{
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
        }}
      />
    </Container>
  );
};

export default BudgetBreakdown;
