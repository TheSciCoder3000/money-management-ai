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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {accounts.map((item) => (
        <AccountCard key={item.id} account={item}></AccountCard>
      ))}
      {loading !== "pending" && <AddAccount />}
    </div>
  );
};

export default AccountList;
