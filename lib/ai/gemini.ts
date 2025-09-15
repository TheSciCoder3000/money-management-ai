import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

export async function RunPrompt(prmpt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

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

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  console.log(text);
  return text;
}
