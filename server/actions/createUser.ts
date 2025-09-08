"use server";

import { createClient } from "@/lib/supabase/server";

export async function CreateUser(email: string, password: string) {
  const supabase = await createClient();

  await supabase.auth.signUp({ email, password });
}
