"use server";

import { createClient } from "@/lib/supabase/server";

export async function LogOutUser() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("cannot log out user");
}
