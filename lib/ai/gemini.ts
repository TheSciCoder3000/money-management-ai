import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

export async function RunPrompt(prmpt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    generationConfig: { responseMimeType: "application/json" },
  });

  const prompt = `
    ${prmpt}.
    parse the prompt into
    {
      amount: number;
      note: string;
      account: "Cash" | "Bank"
    }
    Cash by default
    Respond only in json string.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const json = JSON.parse(text)[0] as AITransactionResponse;

  console.log(text);
  return json;
}
