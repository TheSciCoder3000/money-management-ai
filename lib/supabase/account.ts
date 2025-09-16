import { createClient } from "./server";

export async function GetAccounts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("account")
    .select<`*`, IAccountDb>("*");

  if (error) throw Error("No Accounts");

  return data;
}
