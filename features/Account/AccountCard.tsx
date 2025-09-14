import Container from "@/components/Container";
import { ParseCash } from "@/lib/utils";
import React from "react";

interface AccountCardProps {
  id: string;
  name: string;
  type: string;
  amount: number;
}
const AccountCard: React.FC<AccountCardProps> = ({ name, type, amount }) => {
  return (
    <Container>
      <div>
        <h2 className="text-xl">{name}</h2>
        <h3 className="text-gray-400">{type}</h3>
      </div>

      <h1 className="text-2xl">{ParseCash(amount)}</h1>
    </Container>
  );
};

export default AccountCard;
