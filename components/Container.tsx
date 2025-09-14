import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      {...props}
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
