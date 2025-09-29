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

export interface AccountCreationParameters {
  name: string;
  income: number;
  expenses: number;
  type: string;
}
export async function CreateAccount(accountData: AccountCreationParameters) {
  const supabase = await createClient();
  const user_id = (await supabase.auth.getUser()).data.user?.id;

  if (!user_id) throw new Error("no user");

  const { data, error } = await supabase
    .rpc("add_account_and_transaction", {
      name: accountData.name,
      user_id,
      income: accountData.income,
      expenses: accountData.expenses,
      type: accountData.type,
    })
    .single<IAccountDb>();

  if (error) {
    console.error(`Error: ${error.message}`);
    throw new Error("Unable to create account");
  }

  return data;
}
