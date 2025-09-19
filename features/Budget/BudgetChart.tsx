"use client";

import Container from "@/components/Container";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React from "react";
import { useAppSelector } from "@/redux/store";
import Loader from "@/components/Loader";
import EmptyPrompt from "../Dashboard/EmptyPrompt";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetChart = () => {
  const { categories, loading } = useAppSelector((state) => state.category);
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
    <Container className="flex h-90 items-center">
      <Loader loading={loading === "pending"}>
        {data.length === 0 && <EmptyPrompt message="No Budget Planned" />}

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
      </Loader>
    </Container>
  );
};

export default BudgetChart;
