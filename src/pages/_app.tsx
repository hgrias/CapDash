import { OrganizationProvider } from "~/components/organizationContext";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { Inter } from "next/font/google";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";

// Font from google fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <main lang="en" className={`${inter.variable} font-sans`}>
      <SessionProvider session={session}>
        <OrganizationProvider>
          <Component {...pageProps} />
        </OrganizationProvider>
      </SessionProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
