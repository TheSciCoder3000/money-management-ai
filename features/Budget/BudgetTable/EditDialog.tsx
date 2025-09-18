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
import { useAppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/components/UserProvider";
import { updateCategories } from "@/redux/category/CategoryThunk";

const formSchema = yup.object({
  name: yup.string().required(),
  budget: yup
    .number()
    .typeError("Amount must be a number")
    .nullable() // allow null
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value,
    ),
});

type formData = yup.InferType<typeof formSchema>;

interface EditDialogProps extends Partial<formData> {
  category_id: string;
}
const EditDialog: React.FC<EditDialogProps> = ({
  category_id,
  name,
  budget,
}) => {
  const { session } = useUser();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const { reset, ...form } = useForm<formData>({
    resolver: yupResolver(formSchema) as Resolver<formData>,
    defaultValues: { name, budget },
  });

  useEffect(() => {
    reset({ name, budget });
  }, [reset, name, budget]);

  function onSubmit(values: formData) {
    console.log({ values });
    if (!session) return;
    dispatch(
      updateCategories({
        token: session.access_token,
        value: {
          id: category_id,
          name: values.name,
          budget: values.budget ?? null,
        },
      }),
    );
    setOpen(false);
  }

  useEffect(() => {
    if (!open) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="amount"
                        {...field}
                        value={field.value ?? ""}
                      />
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
