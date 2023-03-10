import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { LoginForm } from "~/components/loginForm";

const Login: NextPage = () => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    console.log("Already logged in! Redirecting to index page.");
  }

  return (
    <div className="auth-container my-20">
      <div className="">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
