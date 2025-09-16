// import { RunPrompt } from "@/lib/ai/gemini";
// import { RunPrompt } from "@/lib/ai/openai";

export async function POST(reqeust: Request) {
  try {
    const { prompt } = (await reqeust.json()) as { prompt: string };
    console.log(prompt);

    // const res = await RunPrompt(prompt);
    const res = null;
    return Response.json({ data: res }, { status: 200 });
  } catch (e) {
    if (e instanceof Error)
      return Response.json({ message: e.message }, { status: 500 });
    return Response.json({ message: "error" }, { status: 500 });
  }
}
