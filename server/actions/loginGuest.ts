"use server";

import { createClient } from "@/lib/supabase/server";

export async function LoginAsGuest() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error(error.message);
    throw new Error("unable to login as guest");
  }
}
