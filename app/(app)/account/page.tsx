import AccountList from "@/features/Account/AccountList";
import { GetAccounts } from "@/lib/supabase/account";
import React from "react";

async function Account() {
  const accounts = await GetAccounts();

  return (
    <div className="p-7">
      <h1 className="mb-8 text-4xl">Account</h1>
      <AccountList accounts={accounts} />
    </div>
  );
}

export default Account;
