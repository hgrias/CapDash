import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { LegislatorGrid } from "~/components/legislatorGrid";
import { Header } from "~/components/header";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  // Redirect to login page if not signed in
  useEffect(() => {
    if (!sessionData) {
      void router.push("/login");
    }
  }, [router, sessionData]);

  return (
    <>
      <Head>
        <title>CapDash</title>
        <meta
          name="Texas Legislator Dashboard"
          content="Dashboard to view TX legislator profiles"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {sessionData ? (
          <>
            <Header />
            <LegislatorGrid />
          </>
        ) : null}
      </main>
    </>
  );
};

export default Home;
