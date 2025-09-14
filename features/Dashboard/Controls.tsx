"use client";

import { Plus } from "lucide-react";
import React from "react";
import { MdSend } from "react-icons/md";

const Controls = () => {
  return (
    <div className="sticky bottom-7 left-0 col-span-4 flex h-fit w-full justify-center">
      <div className="z-5 flex h-fit w-fit items-center gap-2 rounded-full bg-white p-2 shadow-lg">
        <button className="cursor-pointer rounded-full p-2 hover:bg-gray-100">
          <Plus size={15} />
        </button>
        <div className="w-70">
          <input className="block w-full border-none text-gray-500 outline-none" />
        </div>
        <button className="cursor-pointer rounded-full p-2 hover:bg-gray-100">
          <MdSend size={15} />
        </button>
      </div>
    </div>
  );
};

export default Controls;
