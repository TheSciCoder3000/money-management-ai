import React from "react";
import AccountCard from "./AccountCard";
import AddAccount from "./AddAccount";

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
  return (
    <div className="grid grid-cols-3 gap-4">
      {fakeData.map((item) => (
        <AccountCard key={item.id} {...item}></AccountCard>
      ))}
      <AddAccount />
    </div>
  );
};

export default AccountList;
