"use client";

import Container from "@/components/Container";
import { cn, ParseCash } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import ContainerHeader from "./ContainerHeader";
import { useAppSelector } from "@/redux/store";
import EmptyPrompt from "./EmptyPrompt";
import Loader from "@/components/Loader";

interface AccountListProps {
  className?: string;
}
const AccountList: React.FC<AccountListProps> = ({ className }) => {
  const { accounts, loading } = useAppSelector((state) => state.account);
  return (
    <Container className={cn(className)}>
      <ContainerHeader>Accounts</ContainerHeader>
      <div className="relative flex flex-1 flex-col gap-2 overflow-auto">
        <Loader loading={loading === "pending"}>
          {accounts.length === 0 && (
            <EmptyPrompt message="No Accounts, Create a New Account" />
          )}
          {accounts.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex w-full items-center justify-between"
            >
              <div>
                <h2 className="text-sm">{item.name}</h2>
                <h3 className="text-xs text-gray-400">{item.type}</h3>
              </div>

              <div>
                <p>{ParseCash(item.income - item.expenses)}</p>
              </div>
            </div>
          ))}
        </Loader>

        <Link
          href={"/account"}
          className="absolute bottom-0 left-0 block w-full cursor-pointer text-center text-xs text-gray-500 hover:text-gray-700"
        >
          More
        </Link>
      </div>
    </Container>
  );
};

export default AccountList;
