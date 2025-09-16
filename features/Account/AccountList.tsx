"use client";

import React, { useState } from "react";
import AccountCard from "./AccountCard";
import AddAccount from "./AddAccount";

interface AccountListProps {
  accounts: IAccountDb[];
}
const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  const [accountState, setAccountSTate] = useState(accounts);

  console.log(accountState);

  return (
    <div className="grid grid-cols-3 gap-4">
      {accountState.map((item) => (
        <AccountCard
          key={item.id}
          id={item.id}
          name={item.name}
          type={item.type}
          amount={item.balance}
        ></AccountCard>
      ))}
      <AddAccount
        onAdd={(item) => setAccountSTate((state) => [...state, item])}
      />
    </div>
  );
};

export default AccountList;
