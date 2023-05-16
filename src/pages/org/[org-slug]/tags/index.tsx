import { useOrganizationContext } from "~/components/organizationContext";
import { TagTile } from "~/components/tagTile";
import { Header } from "~/components/header";
import { useSession } from "next-auth/react";
import { type NextPage } from "next";
import Error from "next/error";
import Head from "next/head";

const OrgTags: NextPage = () => {
  const { orgTags } = useOrganizationContext();
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
        <title>Organization Tags</title>
        <meta
          name="Texas Legislator Dashboard"
          content="Organization Tags Page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="w-full p-4">
          <h1 className="text-center text-3xl font-bold">Organization Tags</h1>
        </div>
        <div className="grid grid-cols-3 place-content-center gap-10 px-10 pt-2">
          {orgTags?.map((orgTag) => {
            return (
              <TagTile key={orgTag.id} id={orgTag.id} name={orgTag.name} />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default OrgTags;
