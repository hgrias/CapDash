import { useSession } from "next-auth/react";
import { Header } from "~/components/header";
import { type NextPage } from "next";
import Head from "next/head";
import Error from "next/error";

const Home: NextPage = () => {
  const { status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

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
        <>
          <Header />
        </>
      </main>
    </>
  );
};

export default Home;
