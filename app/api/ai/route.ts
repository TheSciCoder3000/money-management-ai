// import { RunPrompt } from "@/lib/ai/gemini";

import { RunPrompt } from "@/lib/ai/openai";

export async function POST(reqeust: Request) {
  const { prompt } = (await reqeust.json()) as { prompt: string };
  console.log(prompt);

  // const res = await RunPrompt(prompt);

  return Response.json({ message: "openai closed" }, { status: 200 });
}
