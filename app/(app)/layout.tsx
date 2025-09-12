import Navbar from "@/features/Navbar/Navbar";
import React from "react";

function Layout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100/70">
      <Navbar />
      <div className="max-h-screen flex-1 overflow-auto">{children}</div>
    </div>
  );
}

export default Layout;
