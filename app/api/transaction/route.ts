import { GetAuthenticatedClient, GetUser } from "@/lib/supabase/utils";
import { ParseErrorJson, ParseJson } from "@/lib/utils";

export async function GET(request: Request) {
  const supabase = await GetAuthenticatedClient(request);

  const { data, error } = await supabase
    .from("transaction")
    .select<`*`, ITransactionDb>("*");

  if (error) return ParseErrorJson(error.message, 500);

  return ParseJson(data, 200);
}

export async function POST(request: Request) {
  const supabase = await GetAuthenticatedClient(request);
  const user = await GetUser(request);

  const bodyData = (await request.json()) as Partial<ITransactionDb>;

  const accountData = {
    ...bodyData,
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from("transaction")
    .insert(accountData)
    .select<`*`, ITransactionDb>("*")
    .single();

  if (error) {
    console.error(`Error: ${error.message}`);
    return ParseErrorJson("insert error", 500);
  }

  return ParseJson(data, 200);
}
