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
import Link from "next/link";
import { LoginAsGuest } from "@/server/actions/loginGuest";

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
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to submit the form. Please try again.");
    }
  }

  async function guestHandler() {
    try {
      await LoginAsGuest();
      router.push("/");
    } catch (err) {
      if (err instanceof Error) toast.error(err.message);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[20rem] space-y-4">
      <h2 className="mb-10 w-full text-center text-3xl font-bold">Log In</h2>
      <Button
        onClick={guestHandler}
        className="w-full cursor-pointer border-2 border-black bg-white text-black hover:text-white"
      >
        Log in as Guest
      </Button>

      <div className="flex items-center gap-2">
        <hr className="flex-1 border-1 border-gray-300" />
        <h2 className="text-sm text-gray-400">OR</h2>
        <hr className="flex-1 border-1 border-gray-300" />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
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

          <div className="text-sm">
            Don&apos;t have an account?{" "}
            <Link className="text-blue-500" href={"/signin"}>
              Sign Up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
