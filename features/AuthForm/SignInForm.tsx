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

export const formSchema = yup.object({
  username: yup.string().required("Please enter a valid username"),
  email: yup.string().email().required("Please enter a valid email"),
  firstname: yup.string().required("Enter your First Name"),
  lastname: yup.string().required("Enter your Last Name"),
  password: yup.string().required("Please enter a password"),
  confirm_password: yup.string().required("Please re-enter a password"),
});

interface SignInFormProps {
  onSignUp: (email: string, password: string) => Promise<void>;
}
const SignInForm: React.FC<SignInFormProps> = ({ onSignUp }) => {
  const form = useForm<yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
  });

  async function onSubmit(values: yup.InferType<typeof formSchema>) {
    try {
      if (values.password !== values.confirm_password)
        throw new PasswordMatchException("Passwords Do not Match");

      await onSignUp(values.email, values.password);

      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>,
      );
    } catch (error) {
      console.error("Form submission error", error);
      if (error instanceof PasswordMatchException) toast.error(error.message);
      else toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-[40rem]">
      <h2 className="mb-5 text-center text-3xl font-bold">Sign In</h2>
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dela Cruz" type="text" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

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

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
