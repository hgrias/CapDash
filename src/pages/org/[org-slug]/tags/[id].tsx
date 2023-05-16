import { type Interaction, type Note } from "@prisma/client";
import { Header } from "~/components/header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Error from "next/error";
import Head from "next/head";

const TagPage: NextPage = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [tagName, setTagName] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  const tagId = useRouter().query.id as string;
  const { status } = useSession();

  const { data, error } = api.tag.getPageInfo.useQuery(
    {
      tagId: parseInt(tagId),
    },
    {
      enabled: !!tagId,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setTagName(data?.name);
      setInteractions(data?.interactions);
      setNotes(data?.notes);
    }
  }, [data]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

  if (error) {
    return <Error statusCode={404} title="Tag Not Found" />;
  }

  return (
    <>
      <Head>
        <title>CapDash | {tagName}</title>
        <meta name="CapDash" content="Organization Tag Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div className="w-full p-4">
          <h1 className="text-center text-3xl font-bold">{tagName}</h1>
        </div>
      </main>
    </>
  );
};

export default TagPage;
