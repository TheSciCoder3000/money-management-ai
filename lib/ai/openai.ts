import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY! });

export async function RunPrompt(prmpt: string) {
  const prompt = `
    ${prmpt}.
    parse the prompt into
    {
      amount: number;
      note: string;
      account: "Cash" | "Bank"
    }
    Cash by default
    Respond only in json.
  `;

  const result = await openai.responses.create({
    model: "gpt-5-nano",
    input: prompt,
    store: true,
  });
  const text = result.output_text;

  console.log(text);
  return text;
}
