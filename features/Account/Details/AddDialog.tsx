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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { Resolver, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTransactons } from "@/redux/transaction/TransactionThunk";
import { useUser } from "@/components/UserProvider";
import clsx from "clsx";
import { fetchAccounts } from "@/redux/account/AccountThunk";

const formSchema = yup.object({
  note: yup.string().required(),
  category: yup.string().required(),
  type: yup.string().required(),
  amount: yup.number().required(),
});

type formData = yup.InferType<typeof formSchema>;

interface AddDialogProps {
  account: IAccountDb;
}
const AddDialog: React.FC<AddDialogProps> = ({ account }) => {
  const { loading } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const form = useForm<formData>({
    resolver: yupResolver(formSchema) as Resolver<formData>,
  });
  const { session } = useUser();

  const onSubmit = (values: formData) => {
    dispatch(
      addTransactons({
        token: session?.access_token,
        value: {
          account_id: account.id,
          value: values.amount,
          category: values.category,
          type: values.type as TransactionType,
          note: values.note,
        },
      }),
    ).then(() => {
      dispatch(fetchAccounts());
    });
    form.reset();
    setOpen(false);
  };

  const handleOpen = (state: boolean) => {
    if (loading === "pending") setOpen(false);
    else setOpen(state);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger
        disabled={loading === "pending"}
        className="flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
        {/* <Button
          variant={loading === "pending" ? "ghost" : "default"}
          className="cursor-pointer"
        >
        </Button> */}
        <Plus className={clsx("stroke-3")} size={15} />
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Add new Transaction here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="w-full max-w-3xl space-y-8 py-10">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["test"].map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["income", "expenses", "transfer"].map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="amount"
                            type="number"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder="notes..." type="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button className="cursor-pointer" type="submit">
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
