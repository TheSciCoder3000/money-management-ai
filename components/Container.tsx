import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode | ReactNode[];
  className?: string;
}
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-md bg-white p-4 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
