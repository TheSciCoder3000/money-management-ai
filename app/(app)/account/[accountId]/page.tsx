import Container from "@/components/Container";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AccountDetail from "@/features/Account/Details/AccountDetail";
import AccountTransactionList from "@/features/Account/Details/AccountTransactionList";
import IncomeExpenseChart from "@/features/Account/Details/IncomeExpenseChart";
import { GetAccount } from "@/lib/supabase/account";
import React from "react";

async function AccountDetails({ params }: PageProps<"/account/[accountId]">) {
  const { accountId } = await params;
  const account = await GetAccount(accountId);

  return (
    <div className="p-7">
      <h1 className="mb-4 text-4xl">{account.name}</h1>
      <PageBreadcrumb title={account.name} />
      <div className="grid grid-cols-4 gap-4">
        <Container className="col-span-full hidden items-center md:flex lg:col-span-3">
          <IncomeExpenseChart account={account} />
        </Container>
        <AccountDetail
          className="col-span-full lg:col-span-1"
          account={account}
        />
        <AccountTransactionList account={account} />
      </div>
    </div>
  );
}

export default AccountDetails;
