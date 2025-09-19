"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Container from "@/components/Container";
import ContainerHeader from "./ContainerHeader";
import { useAppSelector } from "@/redux/store";

ChartJS.register(ArcElement, Tooltip, Legend);

interface BudgetBreakdownProps {
  className?: string;
}
const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({ className }) => {
  const { categories } = useAppSelector((state) => state.category);
  const data = categories
    .filter((item) => item.budget)
    .sort((a, b) => (b.budget as number) - (a.budget as number))
    .map((item) => {
      return {
        label: item.name,
        color: item.color,
        value: item.budget,
      };
    });

  return (
    <Container className={cn(className)}>
      <ContainerHeader>Budget Breakdown</ContainerHeader>

      <Doughnut
        className="p-4"
        data={{
          labels: data.map((item) => item.label),
          datasets: [
            {
              label: "My First Dataset",
              data: data.map((item) => item.value),
              backgroundColor: data.map((item) => item.color),
              hoverOffset: 4,
            },
          ],
        }}
      />
    </Container>
  );
};

export default BudgetBreakdown;
