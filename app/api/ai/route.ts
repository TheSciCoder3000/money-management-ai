// import { RunPrompt } from "@/lib/ai/gemini";
import { AnalyzePrompt } from "@/lib/ai/openai";
import { CreateAccount, GetAccounts } from "@/lib/supabase/account";
import { GetCategories } from "@/lib/supabase/Category";
import { CreateTransaction } from "@/lib/supabase/transaction";

export async function POST(reqeust: Request) {
  try {
    const { prompt } = (await reqeust.json()) as { prompt: string };
    const rawAcc = await GetAccounts();
    const accounts = rawAcc.map((acc) => ({ id: acc.id, name: acc.name }));
    const rawCat = await GetCategories();
    const categories = rawCat.map((cat) => ({
      id: cat.id,
      name: cat.name,
      type: cat.type,
    }));

    const res = await AnalyzePrompt(prompt, accounts, categories);

    if (!res) throw new Error("function call is null");

    if (res.name === "create_transaction") {
      await CreateTransaction({
        note: res.arguments.note,
        value: res.arguments.amount,
        // created_at: res.arguments.datetime,
        account_id: rawAcc.find((item) => item.name === res.arguments.account)
          ?.id,
        category_id: rawCat.find(
          (item) =>
            item.name === res.arguments.category &&
            item.type === res.arguments.type,
        )?.id,
        target_account_id: rawCat.find(
          (item) =>
            item.name === res.arguments.target_account &&
            item.type === res.arguments.type,
        )?.id,
      });

      return Response.json(
        {
          data: {
            method: "transaction",
          },
        },
        { status: 200 },
      );
    } else if (res.name === "create_account") {
      await CreateAccount({
        name: res.arguments.name,
        income: 0,
        expenses: 0,
        type: res.arguments.type,
      });
      return Response.json(
        {
          data: {
            method: "account",
          },
        },
        { status: 200 },
      );
    } else throw new Error("invalid ai method");
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      return Response.json({ message: e.message }, { status: 500 });
    }
    return Response.json({ message: "error" }, { status: 500 });
  }
}
