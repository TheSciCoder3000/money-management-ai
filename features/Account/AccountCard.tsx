"use client";

import Container from "@/components/Container";
import { ParseCash } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

interface AccountCardProps {
  id: string;
  name: string;
  type: string;
  amount: number;
}
const AccountCard: React.FC<AccountCardProps> = ({
  id,
  name,
  type,
  amount,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/account/${id}`);
  };

  return (
    <Container
      onClick={handleClick}
      className="cursor-pointer hover:bg-[#fbfbfb]"
    >
      <div className="mb-3">
        <h2 className="text-lg">{name}</h2>
        <h3 className="text-sm text-gray-400">{type}</h3>
      </div>

      <h1 className="text-2xl">{ParseCash(amount)}</h1>
    </Container>
  );
};

export default AccountCard;
