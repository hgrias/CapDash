import { useOrganizationContext } from "~/components/organizationContext";
import { useSession } from "next-auth/react";
import { Header } from "~/components/header";
import { type NextPage } from "next";
import Error from "next/error";
import Head from "next/head";

const Home: NextPage = () => {
  const { organization } = useOrganizationContext();
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

  if (!organization) {
    return <Error statusCode={404} title="Legislator Not Found" />;
  }

  return (
    <>
      <Head>
        <title>CapDash | {organization.name}</title>
        <meta
          name="Texas Legislator Dashboard"
          content="Dashboard to view TX legislator profiles"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="flex flex-col gap-y-6 px-8 pt-14">
          <h1 className="mt-8 flex w-full text-5xl font-bold text-black">
            {organization.name}
          </h1>
          <div className="grid grid-cols-2 gap-x-6">
            <div className="h-52 rounded-md border p-2">
              <h2 className="p-2 text-2xl font-medium">
                Frequently Visited Pages
              </h2>
            </div>
            <div className="h-52 rounded-md border p-2">
              <h2 className="p-2 text-2xl font-medium">Users</h2>
            </div>
          </div>
          <div className="w-full rounded-md border p-4">
            <h2 className="text-2xl font-medium">Activity</h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
