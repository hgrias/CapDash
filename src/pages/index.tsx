import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { Header } from "~/components/header";
import Bio from "~/components/legislator/bio";

import { api } from "~/utils/api";

const Home: NextPage = () => {
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
        <Legislator />
      </main>
    </>
  );
};

export default Home;

const Legislator: React.FC = () => {
  const { data: sessionData } = useSession();
  const { data: legislators } = api.legislator.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user === undefined,
    }
  );
  const legislatorBios = legislators?.map((legislator) => (
    <Link href={`/legislators/profile/${legislator.id}`}>
      <Bio key={legislator.id} {...legislator} />
    </Link>
  ));

  return <div>{legislatorBios}</div>;
};
