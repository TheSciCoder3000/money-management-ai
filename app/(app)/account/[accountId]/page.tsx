import Container from "@/components/Container";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import TransactionTable from "@/components/TransactionTable";
import AccountDetail from "@/features/Account/Details/AccountDetail";
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
        <Container className="col-span-3 flex items-center">
          <IncomeExpenseChart />
        </Container>
        <AccountDetail account={account} />

        <TransactionTable
          items={[]}
          className="col-span-4"
          filterAccount={false}
        />
      </div>
    </div>
  );
}

export default AccountDetails;
