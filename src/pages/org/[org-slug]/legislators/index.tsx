import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { LegislatorResults } from "~/components/legislatorResults";
import { Switch } from "~/components/ui/switch";
import { useSession } from "next-auth/react";
import { Header } from "~/components/header";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useState } from "react";
import Error from "next/error";
import Head from "next/head";
import {
  InstantSearch,
  SearchBox,
  Configure,
} from "react-instantsearch-hooks-web";

// TODO: Have backup in case the typesense collections cannot be connected to
const Home: NextPage = () => {
  const [view, setView] = useState<"list" | "grid">("list");
  const [scopedSearchApiKey, setScopedSearchApiKey] = useState<string>("");

  // Generate the scoped API key for Typesense
  api.search.generateScopedApiKey.useQuery(undefined, {
    onSuccess: (data) => {
      setScopedSearchApiKey(data);
    },
    refetchOnWindowFocus: false,
  });

  const { status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

  const toggleDisplayMode = () => {
    setView(view === "list" ? "grid" : "list");
  };

  // Typesense Client using scoped API key for org user
  const typesenseSearchAdapter = new TypesenseInstantsearchAdapter({
    server: {
      apiKey: scopedSearchApiKey,
      nodes: [
        {
          host: "127.0.0.1",
          port: 8108,
          protocol: "http",
        },
      ],
    },
    additionalSearchParameters: {
      query_by: "lastName, firstName",
      query_by_weights: "4, 1",
      sort_by: "lastName:asc, firstName:asc",
      include_fields: "firstName,lastName,role,party,district,id",
    },
  });

  return (
    <>
      <Head>
        <title>Legislator Explorer</title>
        <meta name="CapDash" content="CapDash Legislator Explorer" />
      </Head>
      <Header />
      {scopedSearchApiKey && (
        <InstantSearch
          searchClient={typesenseSearchAdapter.searchClient}
          indexName="Legislator"
        >
          <Configure hitsPerPage={32} />
          <div className="flex">
            {/* TODO: top-14 refers to header height to keep header from covering sidebar - fix this */}
            <aside className="sticky top-14 h-screen w-1/4 py-4 pl-4">
              <SearchBox
                placeholder="Search"
                className="w-full rounded-lg bg-gray-100 p-2 shadow-lg"
              />

              <div className="my-4 flex items-center justify-center rounded-lg bg-gray-100 p-2">
                <div className="flex items-center gap-x-2 text-center">
                  <label>List View</label>
                  <Switch onCheckedChange={() => toggleDisplayMode()} />
                  <label>Grid View</label>
                </div>
              </div>
            </aside>
            <main className="w-full">
              <LegislatorResults view={view} />
            </main>
          </div>
        </InstantSearch>
      )}
    </>
  );
};

export default Home;
