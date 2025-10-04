import OpenAI from "openai";
import { AccountCreationParameters } from "../supabase/account";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY! });

const prompt = (
  income_cat: string,
  expenses_cat: string,
  transfer_cat: string,
  accounts: string,
) => ({
  // id: "pmpt_68da601ce40081969593c185448136af03cfc2063c0a8572",
  // version: "7",
  id: "pmpt_68da895aad40819084977e7d444afd3002ee4d719a3874dd",
  // version: "8",
  variables: {
    income_cat,
    expenses_cat,
    transfer_cat,
    accounts,
  },
});

export async function RunPrompt(prmpt: string) {
  const result = await openai.responses.create({
    model: "gpt-5-nano",
    prompt: prompt("", "", "", ""),
    input: [
      {
        role: "user",
        content: prmpt,
      },
    ],
    store: true,
  });
  const text = result.output_text;

  console.log(text);
  return text;
}

interface TransactionFunctionCall {
  name: "create_transaction";
  arguments: {
    note: string;
    amount: number;
    datetime: string;
    category: string;
    account: string;
    target_account?: string;
    type: TransactionType;
  };
}

interface AccountFunctionCall {
  name: "create_account";
  arguments: AccountCreationParameters;
}

type PromptReturnType = TransactionFunctionCall | AccountFunctionCall;
export async function AnalyzePrompt(
  prmpt: string,
  accounts: { id: string; name: string }[],
  categories: { id: string; name: string; type: TransactionType }[],
): Promise<PromptReturnType[] | null> {
  const result = await openai.responses.create({
    model: "gpt-4.1-nano",
    prompt: prompt(
      `${categories
        .filter((item) => item.type === "income")
        .map((c) => `  <category>${c.name}</category>`)
        .join("\n")}
      `,
      `${categories
        .filter((item) => item.type === "expenses")
        .map((c) => `  <category>${c.name}</category>`)
        .join("\n")}
      `,
      `${categories
        .filter((item) => item.type === "transfer")
        .map((c) => `  <category>${c.name}</category>`)
        .join("\n")}
      `,
      `${accounts.map((a) => `  <account>${a.name}</account>`).join("\n")}
      `,
    ),
    input: [
      {
        role: "user",
        content: prmpt,
      },
    ],
    store: true,
    service_tier: "priority",
  });

  const output = (await JSON.parse(result.output_text)) as {
    status: string;
    message: string;
  };

  if (output.status === "failed") throw new Error(output.message);
  console.log(output);

  const tools = result.output as {
    name: "create_account" | "create_transaction";
    arguments: string;
  }[];

  return tools.map((item) => ({
    ...item,
    arguments: JSON.parse(item.arguments),
  }));
}
