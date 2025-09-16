"use client";

import React from "react";
import AccountCard from "./AccountCard";
import AddAccount from "./AddAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AccountList = () => {
  const { accounts, loading } = useSelector(
    (state: RootState) => state.account,
  );

  return (
    <div className="grid grid-cols-3 gap-4">
      {accounts.map((item) => (
        <AccountCard
          key={item.id}
          id={item.id}
          name={item.name}
          type={item.type}
          amount={item.balance}
        ></AccountCard>
      ))}
      {loading !== "pending" && <AddAccount />}
    </div>
  );
};

export default AccountList;
