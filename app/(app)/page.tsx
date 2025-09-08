import OverviewCard from "@/features/Dashboard/OverviewCard";
import React from "react";

export default function Home() {
  return (
    <div className="w-full p-7">
      <OverviewCard total={1000} />
    </div>
  );
}
