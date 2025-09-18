"use client";

import * as React from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "../../components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { updateTransaction } from "@/redux/transaction/TransactionThunk";
import { useUser } from "../../components/UserProvider";
import { fetchAccounts } from "@/redux/account/AccountThunk";

const formSchema = yup.object({
  account_id: yup.string().required(),
  category_id: yup.string().required(),
  paymentMethod: yup.string().required().default("Cash"),
  type: yup.string().required(),
  note: yup.string().required(),
  amount: yup.number().min(0).required(),
});

type formData = yup.InferType<typeof formSchema>;

interface EditDialogProps extends Partial<formData> {
  transaction_id: string;
}
const EditDialog: React.FC<EditDialogProps> = ({
  transaction_id,
  account_id,
  paymentMethod,
  category_id,
  type,
  note,
  amount,
}) => {
  const { accounts } = useAppSelector((state) => state.account);
  const { categories } = useAppSelector((state) => state.category);
  const { session } = useUser();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const { reset, ...form } = useForm<formData>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      account_id,
      paymentMethod,
      type,
      note,
      amount,
      category_id,
    },
  });

  function onSubmit(values: formData) {
    if (!session) return;
    dispatch(
      updateTransaction({
        token: session.access_token,
        value: {
          id: transaction_id,
          account_id: values.account_id,
          category_id: values.category_id,
          note: values.note,
          value: values.amount,
          type: values.type as TransactionType,
        },
      }),
    ).then(() => dispatch(fetchAccounts()));
    setOpen(false);
  }

  useEffect(() => {
    if (!open) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    reset({ account_id, category_id, paymentMethod, type, note, amount });
    console.log("reseting");
  }, [reset, account_id, category_id, paymentMethod, type, note, amount]);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="cursor-pointer rounded-md p-2 hover:bg-gray-200">
          <Pencil size={15} />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <Form {...form} reset={reset}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-sm overflow-auto"
          >
            <DrawerHeader>
              <DrawerTitle>Edit Transaction</DrawerTitle>
              <DrawerDescription>
                Modify your transaction details here
              </DrawerDescription>
            </DrawerHeader>

            <div className="grid w-full grid-cols-1 gap-8 p-4">
              <FormField
                control={form.control}
                name="account_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Account</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accounts.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="w-full">
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
                        {categories.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Transaction Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["income", "expenses", "trasfer"].map((item) => (
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

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Method</FormLabel>
                    <FormControl>
                      <Input placeholder="payment method" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder="note..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DrawerFooter>
              <Button type="submit">Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};

export default EditDialog;
