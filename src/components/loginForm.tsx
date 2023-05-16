import { Landmark, Chrome, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useState } from "react";

export const LoginForm = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data && status === "authenticated") {
      void router.push(`/org/${data.user.organizationSlug}`);
    }
  }, [status, data, router]);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="flex h-1/3 w-1/3 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl outline outline-slate-700">
      <Landmark className="mb-2 h-10 w-10" />
      <h2 className="mb-2 font-bold">CapDash Login</h2>
      <p className="text-center">Please authenticate with a provider</p>
      <div className="mt-2">
        {isLoading ? (
          <Button
            disabled
            className="mt-2 bg-white shadow-md outline outline-1 outline-slate-600"
            variant="outline"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            className="mt-2 bg-white shadow-md outline outline-1 outline-slate-600"
            variant="outline"
            onClick={() => void handleSignIn()}
            disabled={isLoading} // Disable the button while loading
          >
            <Chrome className="mr-2" />
            Sign In with Google
          </Button>
        )}
      </div>
    </div>
  );
};
