import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { useOrganizationContext } from "~/components/organizationContext";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { assembleTypesenseServerConfig } from "~/lib/utils";
import { TagTabs } from "~/components/tag/tagTabs";
import { type Interaction } from "@prisma/client";
import type { RouterOutputs } from "~/utils/api";
import { Header } from "~/components/header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import Error from "next/error";
import Head from "next/head";

// Get types from router outputs
type notesType = RouterOutputs["tag"]["getNotes"];

const TagPage: NextPage = () => {
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [tagName, setTagName] = useState<string>("");
  const [notes, setNotes] = useState<notesType>([]);
  const [typesenseSearchAdapter, setTypesenseSearchAdapter] =
    useState<TypesenseInstantsearchAdapter | null>(null);

  const tagId = useRouter().query.id as string;
  const { status } = useSession();

  const { scopedSearchApiKey } = useOrganizationContext();

  useEffect(() => {
    if (scopedSearchApiKey) {
      const typesenseServerConfig =
        assembleTypesenseServerConfig(scopedSearchApiKey);
      const searchAdapter = new TypesenseInstantsearchAdapter({
        server: typesenseServerConfig,
        additionalSearchParameters: {
          query_by: "content, createdAt",
          query_by_weights: "4, 1",
          sort_by: "createdAt:asc",
          include_fields: "content, createdAt, legislatorId",
        },
      });
      setTypesenseSearchAdapter(searchAdapter);
    }
  }, [scopedSearchApiKey]);

  const { data: tagData, error: tagError } = api.tag.get.useQuery(
    {
      tagId: parseInt(tagId),
    },
    {
      enabled: !!tagId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: noteData, error: notesError } = api.tag.getNotes.useQuery(
    {
      tagId: parseInt(tagId),
    },
    {
      enabled: !!tagId,
      refetchOnWindowFocus: false,
    }
  );

  const { data: interactionData, error: interactionError } =
    api.tag.getInteractions.useQuery(
      {
        tagId: parseInt(tagId),
      },
      {
        enabled: !!tagId,
        refetchOnWindowFocus: false,
      }
    );

  useEffect(() => {
    if (tagData) {
      setTagName(tagData.name);
    }
    if (noteData) {
      setNotes(noteData);
    }
    if (interactionData) {
      setInteractions(interactionData);
    }
  }, [tagData, noteData, interactionData]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

  if (tagError) {
    return <Error statusCode={404} title="Tag Not Found" />;
  }

  return (
    <>
      <Head>
        <title>Tags | {tagName}</title>
        <meta name="CapDash" content="Organization Tag Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {typesenseSearchAdapter && (
        <main className="pt-14">
          <InstantSearch
            searchClient={typesenseSearchAdapter.searchClient}
            indexName="Note"
          >
            <div className="w-full p-4">
              <div className="mb-4 flex items-center justify-between px-4">
                <h1 className="text-center text-3xl font-bold">{tagName}</h1>
              </div>
              <TagTabs />
            </div>
          </InstantSearch>
        </main>
      )}
    </>
  );
};

export default TagPage;
