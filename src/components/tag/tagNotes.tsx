import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { InstantSearch, Configure } from "react-instantsearch-hooks-web";
import { useOrganizationContext } from "../organizationContext";
import { assembleTypesenseServerConfig } from "~/lib/utils";
import { NumResults } from "../ui/search/numResults";
import { TagNotesResults } from "./tagNotesResults";
import { Paginator } from "../ui/search/paginator";
import { SearchBox } from "../ui/search/searchBox";
import { useEffect, useState } from "react";

interface tagNotesType {
  tagId: string;
}

// TODO: Need to filter hits based on the selected tag name
export const TagNotes = ({ tagId }: tagNotesType) => {
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
          query_by: "content, legislatorName, createdByName",
          query_by_weights: "4, 2, 2",
          sort_by: "createdAt:desc",
          include_fields:
            "content, createdAt, legislatorId, legislatorName, createdById, createdByName, id",
        },
      });
      setTypesenseSearchAdapter(searchAdapter);
    }
  }, [scopedSearchApiKey]);

  return (
    <div className="flex h-full">
      {typesenseSearchAdapter && (
        <div className="w-full">
          <InstantSearch
            indexName="Note"
            searchClient={typesenseSearchAdapter.searchClient}
          >
            <Configure hitsPerPage={8} filters={[`tags: [${tagId}]`]} />
            <div className="mb-3 flex items-center justify-between text-center">
              <div className="flex items-center gap-x-3">
                <SearchBox />
                <NumResults />
              </div>
              <Paginator />
            </div>
            <TagNotesResults />
            <div className="mt-3 flex justify-center">
              <Paginator />
            </div>
          </InstantSearch>
        </div>
      )}
    </div>
  );
};
