import { GetAuthenticatedClient, GetUser } from "@/lib/supabase/utils";
import { ParseErrorJson, ParseJson } from "@/lib/utils";

export async function GET(request: Request) {
  const supabase = await GetAuthenticatedClient(request);

  const { data, error } = await supabase
    .from("category")
    .select<`*`, ICategoryDb>("*");

  if (error) return ParseErrorJson(error.message, 500);

  return ParseJson(data, 200);
}

export async function POST(request: Request) {
  const supabase = await GetAuthenticatedClient(request);
  const user = await GetUser(request);

  const bodyData = (await request.json()) as Partial<ICategoryDb>;

  const categoryData = {
    ...bodyData,
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from("category")
    .insert(categoryData)
    .select<`*`, ICategoryDb>("*")
    .single();

  if (error) {
    console.error(`Error: ${error.message}`);
    return ParseErrorJson("insert error", 500);
  }

  return ParseJson(data, 200);
}

export async function PUT(request: Request) {
  const supabase = await GetAuthenticatedClient(request);
  const bodyData = (await request.json()) as Partial<ITransactionDb>;

  if (!bodyData.id) return ParseErrorJson("error: no category id", 500);

  console.log(bodyData);

  const { data, error } = await supabase
    .from("category")
    .update(bodyData)
    .eq("id", bodyData.id)
    .select()
    .single();

  if (error) return ParseErrorJson("failed to update category", 500);

  return ParseJson(data, 200);
}

export async function DELETE(request: Request) {
  const supabase = await GetAuthenticatedClient(request);
  const bodyData = (await request.json()) as Partial<ITransactionDb>;

  if (!bodyData.id) return ParseErrorJson("error: no category id", 500);

  const { error } = await supabase
    .from("category")
    .delete()
    .eq("id", bodyData.id);

  if (error) return ParseErrorJson("failed to delete category", 500);

  return ParseJson({ id: bodyData.id }, 200);
}
