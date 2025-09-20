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
} from "@/components/ui/form";
import * as yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { updateTransaction } from "@/redux/transaction/TransactionThunk";
import { useUser } from "@/components/UserProvider";
import { fetchAccounts } from "@/redux/account/AccountThunk";
import { fetchCategories } from "@/redux/category/CategoryThunk";

const formSchema = yup.object({
  category_id: yup.string().required(),
  type: yup.string().required(),
  note: yup.string().required(),
  amount: yup.number().min(0).required(),
  target: yup.string().optional(),
});

type formData = yup.InferType<typeof formSchema>;

interface EditDialogProps extends Partial<formData> {
  transaction_id: string;
  account: IAccountDb;
}
const EditDialog: React.FC<EditDialogProps> = ({
  transaction_id,
  account,
  category_id,
  type,
  note,
  target,
  amount,
}) => {
  const { accounts, loading: accountsLoading } = useAppSelector(
    (state) => state.account,
  );
  const { categories, loading: categoryLoading } = useAppSelector(
    (state) => state.category,
  );
  const { loading } = useAppSelector((state) => state.transaction);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>((type as TransactionType) ?? null);
  const { session } = useUser();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const { reset, ...form } = useForm<formData>({
    resolver: yupResolver(formSchema) as Resolver<formData>,
    defaultValues: { type, note, amount, target, category_id },
  });

  function onSubmit(values: formData) {
    if (!session) return;

    if (transactionType === "transfer") {
      if (!values.target)
        form.setError("target", { message: "Select a valid Target Account" });
    }

    if (
      !categories.find(
        (item) =>
          item.id === values.category_id && item.type === transactionType,
      )
    )
      return form.setError("category_id", { message: "Select valid category" });

    dispatch(
      updateTransaction({
        token: session.access_token,
        value: {
          id: transaction_id,
          account_id: account.id,
          category_id: values.category_id,
          note: values.note,
          value: values.amount,
          target_account_id:
            transactionType === "transfer" ? values.target : null,
        },
      }),
    ).then(() => {
      dispatch(fetchAccounts());
      dispatch(fetchCategories());
    });
    setOpen(false);
  }

  useEffect(() => {
    if (!open) {
      reset();
      setTransactionType((type as TransactionType) ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    reset({ category_id, type, note, target, amount });
  }, [reset, type, note, category_id, target, amount]);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        disabled={
          accountsLoading === "pending" ||
          categoryLoading === "pending" ||
          loading === "pending"
        }
        className="transition-colors duration-150 hover:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent"
        asChild
      >
        <button className="cursor-pointer rounded-md p-2">
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
              <FormItem className="w-full">
                <FormLabel>Transaction Type</FormLabel>
                <Select
                  defaultValue={type}
                  onValueChange={(val) =>
                    setTransactionType(val as TransactionType)
                  }
                  value={transactionType as string | undefined}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Account type" />
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
                          <SelectValue placeholder="Account type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories
                          .filter((item) => item.type === transactionType)
                          .map((item) => (
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

              {transactionType === "transfer" && (
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Target Account</FormLabel>
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
              )}

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
