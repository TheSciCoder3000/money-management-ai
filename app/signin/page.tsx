import SignInForm from "@/features/AuthForm/SignInForm";
import React from "react";

function SignIn() {
  return (
    <div className="flex min-h-screen w-screen flex-col justify-center pt-10">
      <SignInForm />
    </div>
  );
}

export default SignIn;
