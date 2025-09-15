import { GetAuthenticatedClient, GetUser } from "@/lib/supabase/util";
import { ParseErrorJson, ParseJson } from "@/lib/utils";

export async function GET(request: Request) {
  const supabase = await GetAuthenticatedClient(request);

  const { data, error } = await supabase.from("account").select("*");

  if (error) return ParseErrorJson(error.message, 500);

  return ParseJson(data, 200);
}

interface PostBodySchema {
  name: string;
  type: string;
  balance: number;
  income: number;
  expenses: number;
}
export async function POST(request: Request) {
  const supabase = await GetAuthenticatedClient(request);
  const user = await GetUser(request);

  const data = (await request.json()) as PostBodySchema;

  const accountData = {
    ...data,
    user_id: user.id,
  };

  const { error } = await supabase.from("account").insert(accountData);

  if (error) ParseErrorJson("insert error", 500);

  return ParseJson({ message: "success" }, 200);
}
