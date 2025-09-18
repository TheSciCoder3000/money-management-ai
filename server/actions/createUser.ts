"use server";

import { createClient } from "@/lib/supabase/server";

export async function CreateUser(
  email: string,
  password: string,
  metadata: { username: string; firstname: string; lastname: string },
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  });

  if (error) throw Error(`Error: ${error.message}`);
}
