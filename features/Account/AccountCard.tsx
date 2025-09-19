"use client";

import Container from "@/components/Container";
import { ParseCash } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import MenuAccountCard from "./MenuAccountCard";

interface AccountCardProps {
  account: IAccountDb;
}
const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const isButton = containerRef.current
      ?.querySelector(".menu-btn")
      ?.contains(e.target as Node);
    if (containerRef.current?.contains(e.target as Node) && !isButton) {
      router.push(`/account/${account.id}`);
    }
  };

  return (
    <Container
      ref={containerRef}
      onClick={handleClick}
      className="relative flex h-44 cursor-pointer flex-col justify-between hover:bg-[#fbfbfb]"
    >
      <MenuAccountCard account={account} />
      <div>
        <h2 className="text-lg">{account.name}</h2>
        <h3 className="text-sm text-gray-400">{account.type}</h3>
      </div>

      <h1 className="text-2xl">
        {ParseCash(account.income - account.expenses)}
      </h1>
    </Container>
  );
};

export default AccountCard;
