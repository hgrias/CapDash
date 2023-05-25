import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { useOrganizationContext } from "~/components/organizationContext";
import { LegislatorResults } from "~/components/legislatorResults";
import { assembleTypesenseServerConfig } from "~/lib/utils";
import { Switch } from "~/components/ui/switch";
import { useSession } from "next-auth/react";
import { Header } from "~/components/header";
import { useState, useEffect } from "react";
import { type NextPage } from "next";
import Error from "next/error";
import Head from "next/head";
import {
  RefinementList,
  InstantSearch,
  Configure,
} from "react-instantsearch-hooks-web";
import { SearchBox } from "~/components/ui/search/searchBox";
import { NumResults } from "~/components/ui/search/numResults";

// TODO: Have backup in case the typesense collections cannot be connected to
const LegislatorIndex: NextPage = () => {
  const [view, setView] = useState<"list" | "grid">("list");
  const [typesenseSearchAdapter, setTypesenseSearchAdapter] =
    useState<TypesenseInstantsearchAdapter | null>(null);

  const { scopedSearchApiKey } = useOrganizationContext();

  useEffect(() => {
    if (scopedSearchApiKey) {
      const typesenseServerConfig =
        assembleTypesenseServerConfig(scopedSearchApiKey);
      const searchAdapter = new TypesenseInstantsearchAdapter({
        server: typesenseServerConfig,
        additionalSearchParameters: {
          query_by: "lastName, firstName, district",
          query_by_weights: "4, 1, 1",
          sort_by: "lastName:asc, firstName:asc",
          include_fields: "firstName, lastName, role, party, district, id",
          infix: "fallback",
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
        <main className="bg-gray-50 pt-14">
          <InstantSearch
            searchClient={typesenseSearchAdapter.searchClient}
            indexName="Legislator"
          >
            <Configure hitsPerPage={32} />
            <div className="flex">
              <aside className="sticky flex w-1/4 flex-col items-center gap-y-4 border-r-2 p-4">
                <SearchBox />
                <NumResults />
                <div className="flex flex-col items-center">
                  <label className="mb-1 text-center font-medium">
                    Refinement List
                  </label>
                  <div className="flex flex-col items-start">
                    <RefinementList attribute="party" />
                    <RefinementList attribute="role" />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <label className="mb-1 font-medium">View Select</label>
                  <div className="flex items-center gap-x-2 text-center">
                    <p>List</p>
                    <Switch onCheckedChange={() => toggleDisplayMode()} />
                    <p>Grid</p>
                  </div>
                </div>
              </aside>
              <div className="w-full">
                <LegislatorResults view={view} />
              </div>
            </div>
          </InstantSearch>
        </main>
      )}
    </>
  );
};

export default LegislatorIndex;
