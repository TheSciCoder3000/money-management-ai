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
import { ParseCash } from "@/lib/utils";

interface MainTableProps {
  items: TableDataSchema[];
  filter?: (items: TableDataSchema) => boolean;
}
const MainTable: React.FC<MainTableProps> = ({
  items,
  filter = () => true,
}) => {
  return (
    <Table className="border-separate border-spacing-y-4">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Note</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.filter(filter).map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell className="min-w-fit">{invoice.account.name}</TableCell>
            <TableCell className="min-w-fit">{invoice.paymentMethod}</TableCell>
            <TableCell className="w-auto text-gray-400">
              {invoice.note}
            </TableCell>
            <TableCell className="text-right">
              {ParseCash(invoice.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {ParseCash(
              items
                .filter(filter)
                .reduce((prev, item) => prev + item.amount, 0),
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default MainTable;
