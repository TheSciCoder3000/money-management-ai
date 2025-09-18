import React, { ReactNode } from "react";
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

interface MainTableProps<T extends { id: string }> {
  items: T[];
  Header: (key: keyof T, indx: number) => ReactNode;
  render: (
    indx: number,
    value: T[keyof T],
    key: keyof T,
    Cell: typeof TableCell,
    item: T,
  ) => ReactNode;
  filter?: (items: T) => boolean;
  EditDialog?: (item: T) => ReactNode;
  DeleteDialog?: (item: T) => ReactNode;
  Footer?: (items: T[], Cell: typeof TableCell) => ReactNode;
}
const MainTable = <T extends { id: string }>({
  items,
  render,
  filter = () => true,
  EditDialog,
  DeleteDialog,
  Header,
  Footer,
}: MainTableProps<T>) => {
  const keys = Object.keys(items[0] ?? {}) as (keyof T)[];

  return (
    <Table className="border-separate border-spacing-y-4">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {Header && keys.map((key, indx) => Header(key, indx))}
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.filter(filter).map((invoice) => (
          <TableRow key={invoice.id}>
            {keys.map((itemKey, indx) =>
              render(indx, invoice[itemKey], itemKey, TableCell, invoice),
            )}
            <TableCell className="flex justify-end">
              <div className="flex w-fit justify-between">
                {EditDialog && EditDialog(invoice)}
                {DeleteDialog && DeleteDialog(invoice)}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {Footer && (
        <TableFooter>
          <TableRow>{Footer(items.filter(filter), TableCell)}</TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default MainTable;
