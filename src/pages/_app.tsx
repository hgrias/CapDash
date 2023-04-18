import { OrganizationProvider } from "~/components/organizationContext";
import { SessionProvider } from "next-auth/react";
import { type Session } from "next-auth";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <OrganizationProvider>
        <Component {...pageProps} />
      </OrganizationProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
