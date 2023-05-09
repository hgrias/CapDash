import { signIn, useSession } from "next-auth/react";
import { Landmark, Chrome } from "lucide-react";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { useEffect } from "react";

export const LoginForm = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data && status === "authenticated") {
      void router.push(`/org/${data.user.organizationSlug}`);
    }
  }, [status, data, router]);

  const handleSignIn = async () => {
    await signIn("google");
  };

  return (
    <div className="flex h-1/3 w-1/3 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl outline outline-slate-700">
      <Landmark className="mb-2 h-10 w-10" />
      <h2 className="mb-2 font-bold">CapDash Login</h2>
      <p className="text-center">Please authenticate with a provider</p>
      <div className="">
        <Button
          className="mt-2 bg-white shadow-md outline outline-1 outline-slate-600"
          variant="outline"
          onClick={() => void handleSignIn()}
        >
          Sign In with Google
          <Chrome className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
