import { cn } from "@/lib/utils";
import React from "react";

interface DetailRowProps {
  title: string;
  value: string;
  className?: string;
}
const DetailRow: React.FC<DetailRowProps> = ({ title, value, className }) => {
  return (
    <div className="flex w-full justify-between">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className={cn("text-sm text-gray-500", className)}>{value}</p>
    </div>
  );
};

export default DetailRow;
