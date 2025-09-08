import { formSchema } from "@/features/AuthForm/SignInForm";
import * as yup from "yup";

export type SignInForm = yup.InferType<typeof formSchema>;
