import { Wallet } from "lucide-react";
import { MdOutlineSavings, MdMoneyOff } from "react-icons/md";
import React from "react";
import { cn, ParseCash } from "@/lib/utils";
import Container from "@/components/Container";

interface OverviewProps {
  className?: string;
  total: number;
  expenses: number;
  income: number;
}
const OverviewCard: React.FC<OverviewProps> = ({
  total,
  expenses,
  income,
  className,
}) => {
  const content = [
    {
      label: "Total Balance",
      icon: Wallet,
      value: total,
    },
    {
      label: "Income",
      icon: MdOutlineSavings,
      value: income,
    },
    {
      label: "Expenses",
      icon: MdMoneyOff,
      value: expenses,
    },
  ];

  return (
    <Container className={cn("flex-row", className)}>
      {content.map((Item, indx) => (
        <div key={indx} className="flex gap-2 pr-4">
          <div className="flex aspect-square w-12 items-center justify-center rounded-md bg-gray-100/80 p-2">
            <Item.icon size={20} />
          </div>
          <div>
            <h2 className="text-sm text-gray-400">{Item.label}</h2>
            <h1 className="text-xl font-semibold">$ {ParseCash(Item.value)}</h1>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default OverviewCard;
