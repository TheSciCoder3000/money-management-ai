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
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";

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
          <TableHead className="max-w-[50px]">Invoice</TableHead>
          <TableHead>Account</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Note</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.filter(filter).map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="max-w-[50px] overflow-hidden font-medium">
              {invoice.invoice}
            </TableCell>
            <TableCell className="min-w-fit">{invoice.account.name}</TableCell>
            <TableCell className="min-w-fit">{invoice.paymentMethod}</TableCell>
            <TableCell className="w-auto text-gray-400">
              {invoice.note}
            </TableCell>
            <TableCell className="text-right">
              {ParseCash(invoice.amount)}
            </TableCell>
            <TableCell className="flex justify-end">
              <div className="flex w-fit justify-between">
                <EditDialog
                  transaction_id={invoice.invoice}
                  paymentMethod="Cash"
                  account_id={invoice.account.id}
                  amount={invoice.amount}
                  note={invoice.note}
                />
                <button className="cursor-pointer rounded-md p-2 hover:bg-gray-200">
                  <DeleteDialog id={invoice.invoice} />
                </button>
              </div>
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
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default MainTable;
