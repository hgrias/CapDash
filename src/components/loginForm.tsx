import { signIn } from "next-auth/react";

export const LoginForm = () => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body justify-center">
        <h2 className="card-title justify-center">
          Legislator Profile Dashboard
        </h2>
        <p className="text-center">Please authenticate with Google account</p>
        <div className="card-actions justify-center">
          <button
            className="btn-outline btn"
            onClick={() => void signIn("google", { callbackUrl: "/" })}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
