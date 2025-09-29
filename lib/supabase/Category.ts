import { createClient } from "./server";

export async function GetCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("category")
    .select<`*`, ICategoryDb>("*");

  if (error) throw Error("No Accounts");

  return data;
}
