import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { LoginForm } from "~/components/loginForm";

const Login: NextPage = () => {
  const { data: sessionData } = useSession();
    // TODO: Redirect to index page if user is already logged in
  return (
    <div className="auth-container my-20">
      <div className="">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
