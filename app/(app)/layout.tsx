import { UserProvider } from "@/components/UserProvider";
import Navbar from "@/features/Navbar/Navbar";
import React from "react";
import StoreProvider from "@/redux/StoreProvider";
import Controls from "@/features/Dashboard/Controls";

function Layout({ children }: LayoutProps<"/">) {
  return (
    <StoreProvider>
      <UserProvider>
        <div className="flex h-screen w-screen flex-col overflow-hidden bg-gray-100/70 lg:flex-row">
          <Navbar />
          <div className="relative max-h-screen flex-1 overflow-auto">
            {children}
            <Controls />
          </div>
        </div>
      </UserProvider>
    </StoreProvider>
  );
}

export default Layout;
