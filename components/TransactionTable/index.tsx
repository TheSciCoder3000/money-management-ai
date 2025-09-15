"use client";

import React, { useState } from "react";

import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import AccountSelect from "./AccountSelect";
import MainTable from "./MainTable";
import { Button } from "../ui/button";
import { RefreshCw } from "lucide-react";

const accounts: Account[] = [
  { id: "acc-1", name: "Cash" },
  { id: "acc-2", name: "GoTyme" },
  { id: "acc-3", name: "BPI" },
  { id: "acc-4", name: "GCash" },
];

const invoices: TableDataSchema[] = [
  {
    invoice: "INV-1001",
    account: accounts[0],
    amount: 1200,
    paymentMethod: "Cash",
    note: "Paid on delivery",
  },
  {
    invoice: "INV-1002",
    account: accounts[1],
    amount: 5600,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV-1003",
    account: accounts[2],
    amount: 2500,
    paymentMethod: "Bank Transfer",
    note: "Monthly subscription to multiple products for entertainment purposes, Making this a long text",
  },
  {
    invoice: "INV-1004",
    account: accounts[3],
    amount: 800,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV-1005",
    account: accounts[0],
    amount: 300,
    paymentMethod: "Cash",
    note: "Small expense",
  },
  {
    invoice: "INV-1006",
    account: accounts[2],
    amount: 7200,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV-1007",
    account: accounts[1],
    amount: 1500,
    paymentMethod: "Bank Transfer",
    note: "Transfer fee included",
  },
  {
    invoice: "INV-1008",
    account: accounts[3],
    amount: 980,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV-1009",
    account: accounts[0],
    amount: 450,
    paymentMethod: "Cash",
  },
  {
    invoice: "INV-1010",
    account: accounts[2],
    amount: 3100,
    paymentMethod: "Bank Transfer",
    note: "Office supplies",
  },
  {
    invoice: "INV-1011",
    account: accounts[1],
    amount: 2600,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV-1012",
    account: accounts[3],
    amount: 1200,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV-1013",
    account: accounts[0],
    amount: 600,
    paymentMethod: "Cash",
    note: "Reimbursed later",
  },
  {
    invoice: "INV-1014",
    account: accounts[2],
    amount: 8300,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV-1015",
    account: accounts[1],
    amount: 4700,
    paymentMethod: "Bank Transfer",
    note: "Partial payment",
  },
];

interface TransactionTableProps {
  filterAccount?: boolean;
}
const TransactionTable = ({
  className,
  filterAccount = true,
  ...props
}: React.ComponentProps<"div"> & TransactionTableProps) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(invoices);
  const [accountId, setAccountId] = useState<string | null>(null);

  const handleRefresh = () => {
    setItems(invoices);
  };

  const customFilter = (item: TableDataSchema) => {
    const regex = new RegExp(query, "i");
    const matched = regex.test(item.invoice) || regex.test(item.note || "");

    if (!accountId) return matched;
    return item.account.id === accountId && matched;
  };

  return (
    <Container className={cn("h-fit min-h-full", className)} {...props}>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="cursor-pointer"
        >
          <RefreshCw />
        </Button>
        <Input onChange={(e) => setQuery(e.target.value)} />
        {filterAccount && (
          <AccountSelect onChange={setAccountId} items={accounts} />
        )}
      </div>
      <MainTable items={items} filter={customFilter} />
    </Container>
  );
};

export default TransactionTable;
