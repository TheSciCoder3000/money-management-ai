"use client";

import React from "react";
import AccountCard from "./AccountCard";
import Container from "@/components/Container";
import { Plus } from "lucide-react";

const fakeData = [
  {
    id: "0",
    name: "Wallet",
    type: "Cash",
    amount: 10000,
  },
  {
    id: "1",
    name: "BDO",
    type: "Bank",
    amount: 5000,
  },
  {
    id: "2",
    name: "GoTyme",
    type: "Digital Bank",
    amount: 1000,
  },
  {
    id: "3",
    name: "GCash",
    type: "Digital Bank",
    amount: 500,
  },
];

const AccountList = () => {
  const handleClick = () => {};
  return (
    <div className="grid grid-cols-3 gap-4">
      {fakeData.map((item) => (
        <AccountCard key={item.id} {...item}></AccountCard>
      ))}
      <Container
        onClick={handleClick}
        className="cursor-pointer flex-row items-center justify-center border-1 border-dashed border-gray-300 bg-transparent text-gray-400 shadow-none transition-colors duration-400 hover:border-gray-400 hover:text-gray-500"
      >
        <Plus size={15} className="mr-2" />
        <h2>Add Account</h2>
      </Container>
    </div>
  );
};

export default AccountList;
