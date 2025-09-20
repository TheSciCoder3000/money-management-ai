"use client";

import Container from "@/components/Container";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import React from "react";
import { useAppSelector } from "@/redux/store";
import Loader from "@/components/Loader";
import EmptyPrompt from "../Dashboard/EmptyPrompt";
import ContainerHeader from "../Dashboard/ContainerHeader";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeChart = () => {
  const { categories, loading } = useAppSelector((state) => state.category);
  const data = categories
    .filter((item) => item.type === "income" && item.total > 0)
    .sort((a, b) => (b.total as number) - (a.total as number))
    .map((item) => {
      return {
        label: item.name,
        color: item.color,
        value: item.total,
      };
    });

  return (
    <Container className="flex">
      <ContainerHeader>Income</ContainerHeader>
      <Loader loading={loading === "pending"}>
        <Loader loading={loading === "pending"}>
          {data.length === 0 ? (
            <EmptyPrompt message="No Income" />
          ) : (
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
          )}
        </Loader>
      </Loader>
    </Container>
  );
};

export default IncomeChart;
