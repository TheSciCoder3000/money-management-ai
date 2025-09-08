"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
import { PasswordInput } from "@/components/ui/password-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { PasswordMatchException } from "./PasswordMatchException";
import { useRouter } from "next/navigation";
import { LoginFunc } from "@/server/actions/loginUser";

export const loginFormSchema = yup.object({
  email: yup.string().email().required("Please enter a valid email"),
  password: yup.string().required("Please enter a password"),
});

interface SignInFormProps {
  onLogin: LoginFunc;
}
const SignInForm: React.FC<SignInFormProps> = ({ onLogin }) => {
  const router = useRouter();
  const form = useForm<yup.InferType<typeof loginFormSchema>>({
    resolver: yupResolver(loginFormSchema),
  });

  async function onSubmit(values: yup.InferType<typeof loginFormSchema>) {
    try {
      await onLogin(values.email, values.password);

      toast.success("Login Successful");

      router.push("/");
    } catch (error) {
      console.error("Form submission error", error);
      if (error instanceof PasswordMatchException) toast.error(error.message);
      else toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="mx-auto w-full max-w-[20rem]">
      <h2 className="mb-5 w-full text-center text-3xl font-bold">Log In</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8 py-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="" type="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Log In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
