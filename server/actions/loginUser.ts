"use server";

import { createClient } from "@/lib/supabase/server";

export async function LoginUser(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw Error("cannot log in user");

  return data;
}

export type LoginFunc = typeof LoginUser;
