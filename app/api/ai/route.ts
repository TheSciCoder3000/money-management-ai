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

    const transactionFuncs = res.filter(
      (item) => item.name === "create_transaction",
    );
    const accountFuncs = res.filter((item) => item.name === "create_account");

    console.log({ transactionFuncs, accountFuncs });

    if (transactionFuncs.length > 0) {
      await CreateTransaction(
        transactionFuncs.map((trans) => ({
          note: trans.arguments.note,
          value: trans.arguments.amount,
          // created_at: res.arguments.datetime,
          account_id: rawAcc.find(
            (item) => item.name === trans.arguments.account,
          )?.id,
          category_id: rawCat.find(
            (item) =>
              item.name === trans.arguments.category &&
              item.type === trans.arguments.type,
          )?.id,
          target_account_id: rawAcc.find(
            (item) => item.name === trans.arguments.target_account,
          )?.id,
        })),
      );

      return Response.json(
        {
          data: {
            method: "transaction",
          },
        },
        { status: 200 },
      );
    } else if (accountFuncs.length > 0) {
      for (let i = 0; i < accountFuncs.length; i++) {
        const acc = accountFuncs[i];
        await CreateAccount({
          name: acc.arguments.name,
          income: 0,
          expenses: 0,
          type: acc.arguments.type,
        });
      }
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
