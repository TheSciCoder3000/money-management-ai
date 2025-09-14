import Container from "@/components/Container";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import AccountDetail from "@/features/Account/Details/AccountDetail";
import IncomeExpenseChart from "@/features/Account/Details/IncomeExpenseChart";
import TransactionTable from "@/features/Transaction/TransactionTable";
import React from "react";

const AccountDetails = () => {
  return (
    <div className="p-7">
      <h1 className="mb-4 text-4xl">GoTyme</h1>
      <PageBreadcrumb title="GoTyme" />
      <div className="grid grid-cols-4 gap-4">
        <Container className="col-span-3 flex items-center">
          <IncomeExpenseChart />
        </Container>
        <AccountDetail />

        <TransactionTable className="col-span-4" />
      </div>
    </div>
  );
};

export default AccountDetails;
