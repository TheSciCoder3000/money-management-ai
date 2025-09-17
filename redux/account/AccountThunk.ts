import { createClient } from "@/lib/supabase/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const supabase = createClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("invalid user");
      throw Error("invalid user");
    }

    const res = await fetch("/api/account", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    const { data } = (await res.json()) as { data: IAccountDb[] };
    return data;
  },
);

interface AddArgs {
  token: string | undefined;
  value: {
    type: string;
    name: string;
    income: number;
    expenses: number;
  };
}
export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async ({ token, value }: AddArgs) => {
    if (!token) throw Error("invalid token");

    const res = await fetch("/api/account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(value),
    });

    if (res.status !== 200) throw Error("fetch error");
    const { data } = await res.json();

    return data as IAccountDb;
  },
);
