import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { LoginForm } from "~/components/loginForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();

  // Redirect to index page if logged in
  useEffect(() => {
    if (sessionData && status === "authenticated") {
      void router.push(`/org/${sessionData.user.organizationSlug}`);
    }
  }, [router, sessionData, status]);

  return (
    <div className="flex h-screen w-full justify-center bg-slate-100 pt-20">
      {!sessionData ? (
        <>
          <LoginForm />
        </>
      ) : null}
    </div>
  );
};

export default Login;
