"use client";
import React from "react";

interface OverviewProps {
  total: number;
}
const OverviewCard: React.FC<OverviewProps> = ({ total }) => {
  return (
    <div className="flex w-full rounded-md bg-white p-4 shadow-sm">
      <div></div>

      <div></div>

      <div></div>
    </div>
  );
};

export default OverviewCard;
