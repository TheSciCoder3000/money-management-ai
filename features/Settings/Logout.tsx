"use client";

import { Button } from "@/components/ui/button";
import { LogOutUser } from "@/server/actions/logout";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await LogOutUser();
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form action={handleLogout}>
      <Button
        disabled={loading}
        variant={loading ? "ghost" : "destructive"}
        className="cursor-pointer"
        type="submit"
      >
        Log Out
      </Button>
    </form>
  );
};

export default Logout;
