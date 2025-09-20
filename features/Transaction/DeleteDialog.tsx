import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { deleteTransaction } from "@/redux/transaction/TransactionThunk";
import { useUser } from "../../components/UserProvider";
import { fetchAccounts } from "@/redux/account/AccountThunk";
import { fetchCategories } from "@/redux/category/CategoryThunk";

interface DeleteDialogProps {
  id: string;
}
const DeleteDialog: React.FC<DeleteDialogProps> = ({ id }) => {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { session } = useUser();

  const onDelete = () => {
    if (!session) return;
    dispatch(
      deleteTransaction({ token: session.access_token, value: { id } }),
    ).then(() => {
      dispatch(fetchAccounts());
      dispatch(fetchCategories());
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        disabled={
          state.account.loading === "pending" ||
          state.category.loading === "pending" ||
          state.transaction.loading === "pending"
        }
        className="cursor-pointer rounded-md p-2 hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
      >
        <Trash2 size={15} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Transaction</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this transaction?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
