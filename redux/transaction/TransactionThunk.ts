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
