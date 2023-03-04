import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { LoginForm } from "~/components/loginForm";
import { redirect } from "next/navigation";

const Login: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="auth-container my-20">
      <div className="">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
