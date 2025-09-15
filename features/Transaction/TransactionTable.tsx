"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { WalletCards } from "lucide-react";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: 1000,
    paymentMethod: "Cash",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: 2000,
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: 10000,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: 5000,
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: 100,
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: 100,
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: 700,
    paymentMethod: "Credit Card",
  },
];

const TransactionTable = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <Container className={cn("h-fit min-h-full", className)} {...props}>
      <div className="flex gap-2">
        <Input />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="cursor-pointer">
              <WalletCards className="inline" size={10} /> Account
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>BDO</DropdownMenuItem>
              <DropdownMenuItem>GoTyme</DropdownMenuItem>
              <DropdownMenuItem>BPI</DropdownMenuItem>
              <DropdownMenuItem>GCash</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table className="border-separate border-spacing-y-4">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  );
};

export default TransactionTable;
