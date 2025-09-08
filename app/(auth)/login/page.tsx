import LoginForm from "@/features/AuthForm/LoginForm";
import { LoginUser } from "@/server/actions/loginUser";
import React from "react";

function SignIn() {
  return (
    <div className="flex min-h-screen w-screen flex-col justify-center pt-10">
      <LoginForm onLogin={LoginUser} />
    </div>
  );
}

export default SignIn;
