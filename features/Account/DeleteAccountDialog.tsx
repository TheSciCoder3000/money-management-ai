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
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchTransactons } from "@/redux/transaction/TransactionThunk";
import { deleteAccount } from "@/redux/account/AccountThunk";
import { useUser } from "@/components/UserProvider";

interface DeleteDialogProps {
  id: string;
  closeMenu: () => void;
}
const DeleteAccountDialog: React.FC<DeleteDialogProps> = ({
  id,
  closeMenu,
}) => {
  const { loading } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { session } = useUser();

  const onDelete = () => {
    if (!session) return;
    dispatch(
      deleteAccount({ token: session.access_token, value: { id } }),
    ).then(() => dispatch(fetchTransactons()));
    setOpen(false);
    closeMenu();
  };

  const handleOpen = (state: boolean) => {
    if (loading === "pending") setOpen(false);
    else setOpen(state);
    if (!state) closeMenu();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger
        className="w-full text-left"
        disabled={loading === "pending"}
      >
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this account?
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

export default DeleteAccountDialog;
