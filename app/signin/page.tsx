import SignInForm from "@/features/AuthForm/SignInForm";
import { CreateUser } from "@/server/actions/createUser";
import React from "react";

function SignIn() {
  return (
    <div className="flex min-h-screen w-screen flex-col justify-center pt-10">
      <SignInForm onSignUp={CreateUser} />
    </div>
  );
}

export default SignIn;
