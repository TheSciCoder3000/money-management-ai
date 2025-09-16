import { useUser } from "@/components/UserProvider";
import { addAccount } from "@/redux/account/AccountThunk";
import { useAppDispatch } from "@/redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";

const formSchema = yup.object({
  name: yup.string().required("Please enter Account name"),
  type: yup.string().required(),
  balance: yup.number().min(0).required(),
  income: yup.number().min(0).required(),
  expenses: yup.number().min(0).required(),
});

const useAddAccount = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { session } = useUser();
  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  async function onSubmit(value: yup.InferType<typeof formSchema>) {
    try {
      dispatch(addAccount({ token: session?.access_token, value }));
      setOpen(false);
      form.reset();
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
    }
  }

  return {
    form,
    onSubmit,
    open,
    setOpen,
  };
};

export default useAddAccount;
