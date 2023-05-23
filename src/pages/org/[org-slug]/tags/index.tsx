import { useOrganizationContext } from "~/components/organizationContext";
import { CreateTagDialog } from "~/components/tag/createTagDialog";
import { TagTile } from "~/components/tagTile";
import { Header } from "~/components/header";
import { useSession } from "next-auth/react";
import { type NextPage } from "next";
import Error from "next/error";
import Head from "next/head";

const OrgTags: NextPage = () => {
  const { orgTags, organization } = useOrganizationContext();
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
        <title>{organization?.name} | Tags</title>
        <meta
          name="Texas Legislator Dashboard"
          content="Organization Tags Page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="h-full min-h-screen bg-gray-50 pt-14">
        <div className="flex w-full items-center justify-between gap-x-2 px-10 py-6">
          <h1 className="text-3xl font-bold">Organization Tags</h1>
          <CreateTagDialog />
        </div>
        <div className="grid grid-cols-3 place-content-center gap-10 px-10 pb-6 pt-2">
          {orgTags?.map((orgTag) => {
            return (
              <TagTile
                key={orgTag.id}
                id={orgTag.id}
                name={orgTag.name}
                isFavorite={orgTag.isFavorite}
              />
            );
          })}
        </div>
      </main>
    </>
  );
};

export default OrgTags;
