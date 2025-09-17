import { createClient } from "@/lib/supabase/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransactons = createAsyncThunk(
  "transactions/fetchTransactons",
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

    const res = await fetch("/api/transaction", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    const { data } = (await res.json()) as { data: ITransactionDb[] };
    return data;
  },
);

interface AddArgs {
  token: string | undefined;
  value: {
    account_id: string;
    value: number;
    category: string;
    type: TransactionType;
    note: string;
  };
}
export const addTransactons = createAsyncThunk(
  "transactions/addTransactons",
  async ({ token, value }: AddArgs) => {
    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify(value),
    });
    const { data } = (await res.json()) as { data: ITransactionDb };
    return data;
  },
);

interface UpdateArgs {
  token: string | undefined;
  value: Partial<ITransactionDb>;
}
export const updateTransaction = createAsyncThunk(
  "transactions/updateTransaction",
  async ({ token, value }: UpdateArgs) => {
    const res = await fetch("/api/transaction", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify(value),
    });

    const { data } = (await res.json()) as { data: ITransactionDb };
    return data;
  },
);
