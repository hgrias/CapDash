import { signIn } from "next-auth/react";
import { Landmark, Chrome } from "lucide-react";
import { Button } from "./ui/button";

export const LoginForm = () => {
  return (
    <div className="flex h-1/3 w-1/3 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl outline outline-slate-700">
      <Landmark className="mb-2 h-10 w-10" />
      <h2 className="mb-2 font-bold">CapDash Login</h2>
      <p className="text-center">Please authenticate with a provider</p>
      <div className="">
        <Button
          className="mt-2 bg-white shadow-md outline outline-1 outline-slate-600"
          variant="outline"
          onClick={() => void signIn("google", { callbackUrl: "/" })}
        >
          Sign In with Google
          <Chrome className="ml-2" />
        </Button>
      </div>
    </div>
  );
};
