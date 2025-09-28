import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasEnvVars =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function ParseCash(amount: number | null) {
  if (amount === null) return "-";
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    currency: "PHP",
    style: "currency",
  });
}

export function CapitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function ParseErrorJson(message: string, status: number) {
  return Response.json({ message }, { status });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ParseJson(data: any, status: number) {
  return Response.json({ data }, { status });
}
