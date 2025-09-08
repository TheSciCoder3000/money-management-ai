import { LinkButton } from "@/components/ui/link-button";
import React from "react";

function EmailVerified() {
  return (
    <div className="h-screen w-screen overflow-hidden pt-20">
      <div className="mx-auto flex max-w-[30rem] flex-col items-center">
        <h1 className="mb-2 text-center text-4xl font-bold">Email Verified</h1>
        <p className="mb-5 text-center">You can now log in to your account</p>
        <LinkButton className="block" href={"/login"}>
          LOG IN
        </LinkButton>
      </div>
    </div>
  );
}

export default EmailVerified;
