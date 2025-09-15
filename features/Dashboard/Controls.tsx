"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { toast } from "sonner";

const Controls = () => {
  const [prompt, setPrompt] = useState("");
  const [sending, setSending] = useState(false);

  const handlePromptSubmit = async () => {
    setSending(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (res.status === 200) {
        const { message } = (await res.json()) as { message: string };
        toast(message);
        setPrompt("");
      }
    } catch (e) {
      if (e instanceof Error) console.error(e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="sticky bottom-7 left-[50%] col-span-4 flex h-fit w-fit -translate-x-[50%] justify-center">
      <form
        onSubmit={handlePromptSubmit}
        className="z-5 flex h-fit w-fit items-center gap-2 rounded-full bg-white p-2 shadow-lg"
      >
        <button className="cursor-pointer rounded-full p-2 hover:bg-gray-100">
          <Plus size={15} />
        </button>
        <div className="w-70">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="block w-full border-none text-gray-500 outline-none"
          />
        </div>
        <button
          disabled={sending}
          type="submit"
          className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
        >
          <MdSend size={15} />
        </button>
      </form>
    </div>
  );
};

export default Controls;
