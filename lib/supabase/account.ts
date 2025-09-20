import { createClient } from "./server";

export async function GetAccounts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("account")
    .select<`*`, IAccountDb>("*");

  if (error) throw Error("No Accounts");

  return data;
}

export async function GetAccount(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("account")
    .select<
      `*, transaction:transaction_account_id_fkey (*)`,
      IAccountDb
    >("*, transaction:transaction_account_id_fkey (*)")
    .eq("id", id)
    .single();

  if (error) throw Error(error.message);

  return data;
}
