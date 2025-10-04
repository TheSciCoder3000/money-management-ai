"use client";

import { fetchAccounts } from "@/redux/account/AccountThunk";
import { useAppDispatch } from "@/redux/store";
import { fetchTransactons } from "@/redux/transaction/TransactionThunk";
import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { toast } from "sonner";
import AddDialog from "../Transaction/AddDialog";

const Controls = () => {
  const [prompt, setPrompt] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useAppDispatch();

  const handlePromptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      if (prompt.trim().length === 0) throw new Error("invalid prompt");

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (res.status === 200) {
        const { data } = (await res.json()) as {
          data: { method: "transaction" | "account" };
        };
        if (data.method === "transaction") {
          dispatch(fetchTransactons());
          dispatch(fetchAccounts());
        } else if (data.method === "account") dispatch(fetchAccounts());
        // toast(
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //   </pre>,
        // );
        toast.info(`${data.method} created successfully`);
        setPrompt("");
      } else {
        const { message } = (await res.json()) as { message: string };
        throw new Error(message);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        return toast.error(e.message);
      }
      toast.error("Unable to follow command");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pointer-events-none sticky bottom-7 left-0 col-span-4 mb-4 flex h-fit w-full -translate-x-[0%] justify-center px-6">
      <div className="pointer-events-auto z-5 flex h-fit w-full max-w-[40rem] items-center gap-2 rounded-full bg-white p-1 shadow-lg">
        <AddDialog />
        <form
          onSubmit={handlePromptSubmit}
          className="flex flex-1 items-center"
        >
          <div className="w-full">
            <input
              placeholder="Add transactions or accounts here"
              disabled={sending}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="block w-full border-none text-gray-500 outline-none disabled:text-gray-500"
            />
          </div>
          <button
            disabled={sending}
            type="submit"
            className="cursor-pointer rounded-full p-2 hover:bg-gray-100 disabled:text-gray-400"
          >
            <MdSend size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Controls;
