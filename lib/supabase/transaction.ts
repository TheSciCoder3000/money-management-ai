import { createClient } from "./server";

export async function CreateTransaction(
  transactionData: Partial<ITransactionDb>[],
) {
  const supabase = await createClient();
  const user_id = (await supabase.auth.getUser()).data.user?.id;

  if (!user_id) throw new Error("no user");

  console.log({ transactionData });

  const { data, error } = await supabase
    .from("transaction")
    .insert(transactionData.map((item) => ({ ...item, user_id })))
    .select<`*`, ITransactionDb>("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error: ${error.message}`);
    throw new Error(error.message);
  }

  return data;
}

export async function GetTransactions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transaction")
    .select<`*`, ITransactionDb>("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function DeleteTransaction(transaction_id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("transaction")
    .delete()
    .eq("id", transaction_id);

  if (error) throw new Error(error.message);
}
