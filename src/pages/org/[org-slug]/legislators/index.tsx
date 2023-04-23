import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { LegislatorGrid } from "~/components/legislatorGrid";
import { useSession } from "next-auth/react";
import { Header } from "~/components/header";
import { type NextPage } from "next";
import Error from "next/error";
import {
  InstantSearch,
  RefinementList,
  SearchBox,
  Configure,
  Pagination,
} from "react-instantsearch-hooks-web";

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
  const { status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <InstantSearch
          searchClient={typesenseSearchAdapter.searchClient}
          indexName="legislators"
        >
          <Configure hitsPerPage={32} />
          <aside className="h-screen w-1/4 bg-gray-100">
            <RefinementList attribute="party" />
          </aside>
          <main className="">
            <SearchBox className="bg-gray-100 p-4 shadow-lg" />
            <LegislatorGrid />
            <Pagination className="bg-gray-100" />
          </main>
        </InstantSearch>
      </div>
    </div>
  );
};

export default Home;
