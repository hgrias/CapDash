import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { LoginForm } from "~/components/loginForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  // Redirect to index page if logged in
  useEffect(() => {
    if (sessionData) {
      void router.push("/");
    }
  }, [router, sessionData]);

  return (
    <div className="auth-container my-20">
      <div className="">
        {!sessionData ? (
          <>
            <LoginForm />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
