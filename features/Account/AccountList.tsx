"use client";

import React, { useEffect } from "react";
import AccountCard from "./AccountCard";
import AddAccount from "./AddAccount";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { fetchAccounts } from "@/redux/account/AccountThunk";

const AccountList = () => {
  const { accounts, loading } = useSelector(
    (state: RootState) => state.account,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
