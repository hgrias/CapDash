import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { LegislatorGrid } from "~/components/legislatorGrid";
import { Header } from "~/components/header";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  // Redirect to login page if not signed in
  if (!sessionData) {
    console.log("Not signed in. Redirecting to login page for authentication.");
  }

  return (
    <>
      <Head>
        <title>Legislator Dashboard</title>
        <meta
          name="Texas Legislator Dashboard"
          content="Dashboard to view TX legislator profiles"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <LegislatorGrid />
      </main>
    </>
  );
};

export default Home;
