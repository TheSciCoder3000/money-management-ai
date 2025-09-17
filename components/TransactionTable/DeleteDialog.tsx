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
import { useUser } from "../UserProvider";

interface DeleteDialogProps {
  id: string;
}
const DeleteDialog: React.FC<DeleteDialogProps> = ({ id }) => {
  const { loading } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { session } = useUser();

  const onDelete = () => {
    if (!session) return;
    dispatch(deleteTransaction({ token: session.access_token, value: { id } }));
    setOpen(false);
  };

  const handleOpen = (state: boolean) => {
    if (loading === "pending") setOpen(false);
    else setOpen(state);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger disabled={loading === "pending"}>
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
