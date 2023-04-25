import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { LegislatorResults } from "~/components/legislatorResults";
import { Switch } from "~/components/ui/switch";
import { useSession } from "next-auth/react";
import { Header } from "~/components/header";
import { type NextPage } from "next";
import Error from "next/error";
import {
  InstantSearch,
  SearchBox,
  Configure,
} from "react-instantsearch-hooks-web";
import { useState } from "react";
import Head from "next/head";

// TODO: Abstract this out - add vals to config
const typesenseSearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: "xyz",
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

const Home: NextPage = () => {
  const [view, setView] = useState<"list" | "grid">("list");

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

  return (
    <>
      <Head>
        <title>Legislator Explorer</title>
        <meta name="CapDash" content="CapDash Legislator Explorer" />
      </Head>
      <Header />
      <InstantSearch
        searchClient={typesenseSearchAdapter.searchClient}
        indexName="legislators"
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
    </>
  );
};

export default Home;
