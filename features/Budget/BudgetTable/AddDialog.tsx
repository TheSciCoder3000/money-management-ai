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
import { Plus } from "lucide-react";
import { Resolver, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@/components/UserProvider";
import clsx from "clsx";
import { addCategories } from "@/redux/category/CategoryThunk";
import { SketchPicker } from "react-color";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = yup.object({
  name: yup.string().required(),
  budget: yup.number(),
  type: yup.string().required(),
  color: yup.string().required(),
});

type formData = yup.InferType<typeof formSchema>;

const AddDialog = () => {
  const { loading } = useAppSelector((state) => state.transaction);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const form = useForm<formData>({
    resolver: yupResolver(formSchema) as Resolver<formData>,
  });
  const { session } = useUser();

  const onSubmit = (values: formData) => {
    dispatch(
      addCategories({
        token: session?.access_token,
        value: {
          name: values.name,
          budget: values.budget || null,
          type: values.type,
          color: values.color,
        },
      }),
    );
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
        <Plus className={clsx("stroke-3")} size={15} />
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>
                Add new Transaction here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="h-[60vh] w-full max-w-3xl space-y-8 overflow-y-auto px-1 py-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="general" type="" {...field} />
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
                      <Input placeholder="amount" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            {["expenses", "income"].map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <SketchPicker
                        color={field.value}
                        onChange={(color) => field.onChange(color.hex)}
                        onChangeComplete={(color) => field.onChange(color.hex)}
                        className="w-full"
                      />
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
