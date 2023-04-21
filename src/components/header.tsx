import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-landmark"
            >
              <line x1="3" x2="21" y1="22" y2="22"></line>
              <line x1="6" x2="6" y1="18" y2="11"></line>
              <line x1="10" x2="10" y1="18" y2="11"></line>
              <line x1="14" x2="14" y1="18" y2="11"></line>
              <line x1="18" x2="18" y1="18" y2="11"></line>
              <polygon points="12 2 20 7 4 7"></polygon>
            </svg>
            <span className="hidden font-bold sm:inline-block">CapDash</span>
          </Link>
          {/* TODO: Change to text-foreground on each link when selected */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              href="/"
            >
              Legislators
            </Link>
            <a
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              href=""
            >
              Tags
            </a>
            <a
              className="text-foreground/60 transition-colors hover:text-foreground/80"
              href=""
            >
              Examples
            </a>
          </nav>
        </div>
        {/* TODO: Add Organization and User Dropdowns */}
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <nav className="flex items-center space-x-1">Hello</nav>
        </div>
      </div>
    </header>
  );
};
