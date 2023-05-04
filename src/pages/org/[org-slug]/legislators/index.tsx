import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { useOrganizationContext } from "~/components/organizationContext";
import { LegislatorResults } from "~/components/legislatorResults";
import { Switch } from "~/components/ui/switch";
import { useSession } from "next-auth/react";
import { Header } from "~/components/header";
import { useState, useEffect } from "react";
import { type NextPage } from "next";
import Error from "next/error";
import Head from "next/head";
import {
  InstantSearch,
  SearchBox,
  Configure,
  RefinementList,
} from "react-instantsearch-hooks-web";

// TODO: Have backup in case the typesense collections cannot be connected to
const Home: NextPage = () => {
  const [view, setView] = useState<"list" | "grid">("list");
  const [typesenseSearchAdapter, setTypesenseSearchAdapter] =
    useState<TypesenseInstantsearchAdapter | null>(null);

  const { scopedSearchApiKey } = useOrganizationContext();

  useEffect(() => {
    if (scopedSearchApiKey) {
      const searchAdapter = new TypesenseInstantsearchAdapter({
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
      setTypesenseSearchAdapter(searchAdapter);
    }
  }, [scopedSearchApiKey]);

  const { status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

  if (!scopedSearchApiKey) {
    return null;
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
      {typesenseSearchAdapter && (
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
              <div className="my-4 flex flex-col rounded-lg bg-gray-100 p-2">
                <RefinementList attribute="party" />
                <RefinementList attribute="role" />
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
