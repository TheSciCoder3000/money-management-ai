import Container from "@/components/Container";
import ContainerHeader from "@/features/Dashboard/ContainerHeader";
import { cn, ParseCash } from "@/lib/utils";
import React from "react";
import DetailRow from "./DetailRow";

const AccountDetail = ({
  className,
  account,
  ...props
}: React.ComponentProps<"div"> & { account: IAccountDb }) => {
  return (
    <Container {...props} className={cn("", className)}>
      <ContainerHeader>Details</ContainerHeader>
      <div className="mt-4 flex flex-col gap-2">
        <DetailRow title="Name" value={account.name} />
        <DetailRow title="Type" value={account.type} />
        <DetailRow title="Account No." value="09954289231" />
        <DetailRow
          className="text-green-600"
          title="Current Balance"
          value={ParseCash(account.balance)}
        />
        <DetailRow
          className="text-red-400"
          title="Total Expenses"
          value={ParseCash(account.expenses)}
        />
      </div>
    </Container>
  );
};

export default AccountDetail;
