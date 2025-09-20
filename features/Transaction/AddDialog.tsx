import React, { useEffect, useState } from "react";
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
import { useUser } from "../../components/UserProvider";
import clsx from "clsx";
import { fetchAccounts } from "@/redux/account/AccountThunk";
import { fetchCategories } from "@/redux/category/CategoryThunk";
import DatePicker from "@/components/DatePicker";

const formSchema = yup.object({
  note: yup.string().required(),
  category: yup.string().required(),
  account: yup.string().required(),
  amount: yup.number().required(),
  target: yup.string().optional(),
  date: yup.string().optional(),
});

type formData = yup.InferType<typeof formSchema>;

const AddDialog = () => {
  const { accounts, loading: accountLoading } = useAppSelector(
    (state) => state.account,
  );
  const { categories, loading: categoryLoading } = useAppSelector(
    (state) => state.category,
  );
  const { loading } = useAppSelector((state) => state.transaction);
  const [transactionType, setTransactionType] =
    useState<TransactionType | null>(null);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const form = useForm<formData>({
    resolver: yupResolver(formSchema) as Resolver<formData>,
  });
  const { session } = useUser();

  const onSubmit = (values: formData) => {
    if (transactionType === "transfer") {
      if (!values.target)
        return form.setError("target", {
          message: "Select a valid target account",
        });

      if (values.target === values.account)
        return form.setError("target", {
          message: "Select a target account different from main account",
        });
    }

    const account = accounts.find((item) => item.id === values.account);
    if (!account)
      return form.setError("account", {
        message: "Account does not exist, refresh",
      });

    if (
      account.income - account.expenses < values.amount &&
      transactionType === "expenses"
    )
      return form.setError("amount", {
        message: `Your transaction is greater than your balance`,
      });

    if (
      !categories.find(
        (item) => item.id === values.category && item.type === transactionType,
      )
    )
      return form.setError("category", { message: "Select valid category" });
    dispatch(
      addTransactons({
        token: session?.access_token,
        value: {
          account_id: values.account,
          value: values.amount,
          category_id: values.category,
          note: values.note,
          target_account_id:
            transactionType === "transfer" ? (values.target ?? null) : null,
          created_at: values.date,
        },
      }),
    ).then(() => {
      dispatch(fetchAccounts());
      dispatch(fetchCategories());
    });
    form.reset();
    setOpen(false);
  };

  const handleOpen = (state: boolean) => {
    if (loading === "pending") setOpen(false);
    else setOpen(state);
  };

  useEffect(() => {
    if (!open) {
      form.reset();
      setTransactionType(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger
        disabled={
          loading === "pending" ||
          accountLoading === "pending" ||
          categoryLoading === "pending"
        }
        className="flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent"
      >
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
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="account"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Account Type" />
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
                </div>

                <div className="col-span-6">
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={(val: TransactionType) =>
                        setTransactionType(val)
                      }
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
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
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
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <DatePicker
                      onValueChange={(val) =>
                        field.onChange(val?.toISOString())
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {transactionType === "transfer" && (
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Account</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Account Type" />
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
