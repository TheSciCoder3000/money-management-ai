import { createClient } from "@/lib/supabase/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
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

    const res = await fetch("/api/category", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    const { data } = (await res.json()) as { data: ICategoryDb[] };
    return data;
  },
);

interface AddArgs {
  token: string | undefined;
  value: {
    name: string;
    budget: number | null;
    color: string;
    type: string;
  };
}
export const addCategories = createAsyncThunk(
  "categories/addCategories",
  async ({ token, value }: AddArgs) => {
    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify(value),
    });
    const { data } = (await res.json()) as { data: ICategoryDb };
    return data;
  },
);

interface UpdateArgs {
  token: string | undefined;
  value: Partial<ICategoryDb>;
}
export const updateCategories = createAsyncThunk(
  "categories/updateCategories",
  async ({ token, value }: UpdateArgs) => {
    const res = await fetch("/api/category", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify(value),
    });

    const { data } = (await res.json()) as { data: ICategoryDb };
    return data;
  },
);

interface deleteArgs {
  token: string | undefined;
  value: {
    id: string;
  };
}
export const deleteCategroy = createAsyncThunk(
  "categories/deleteCategroy",
  async ({ token, value }: deleteArgs) => {
    const res = await fetch("/api/category", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "applicaton/json",
      },
      body: JSON.stringify(value),
    });

    const { data } = (await res.json()) as { data: { id: string } };
    return data;
  },
);
