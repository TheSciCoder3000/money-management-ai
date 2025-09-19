import { InfoIcon } from "lucide-react";
import React from "react";

interface EmptyPromptProps {
  message: string;
}
const EmptyPrompt: React.FC<EmptyPromptProps> = ({ message }) => {
  return (
    <div className="mt-8 flex flex-col items-center justify-center">
      <InfoIcon size={15} />
      <p className="mt-2 text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyPrompt;
