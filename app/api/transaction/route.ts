import {
  CreateTransaction,
  DeleteTransaction,
  GetTransactions,
} from "@/lib/supabase/transaction";
import { GetAuthenticatedClient, GetUser } from "@/lib/supabase/utils";
import { ParseErrorJson, ParseJson } from "@/lib/utils";

export async function GET() {
  try {
    const data = await GetTransactions();
    return ParseJson(data, 200);
  } catch (error) {
    if (error instanceof Error) return ParseErrorJson(error.message, 500);
  }
}

export async function POST(request: Request) {
  const user = await GetUser(request);

  const bodyData = (await request.json()) as Partial<ITransactionDb>;

  const accountData = {
    ...bodyData,
    user_id: user.id,
  };

  try {
    const data = await CreateTransaction(accountData);
    return ParseJson(data, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
      return ParseErrorJson("insert error", 500);
    }
  }
}

export async function PUT(request: Request) {
  const supabase = await GetAuthenticatedClient(request);
  const bodyData = (await request.json()) as Partial<ITransactionDb>;

  if (!bodyData.id) return ParseErrorJson("error: no transaction id", 500);

  const { data, error } = await supabase
    .from("transaction")
    .update(bodyData)
    .eq("id", bodyData.id)
    .select()
    .single();

  if (error) return ParseErrorJson("failed to update", 500);

  return ParseJson(data, 200);
}

export async function DELETE(request: Request) {
  const bodyData = (await request.json()) as Partial<ITransactionDb>;

  if (!bodyData.id) return ParseErrorJson("error: no transaction id", 500);

  try {
    await DeleteTransaction(bodyData.id);
    return ParseJson({ id: bodyData.id }, 200);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return ParseErrorJson("failed to delete", 500);
    }
  }
}
