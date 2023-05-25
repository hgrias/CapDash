import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { useOrganizationContext } from "../organizationContext";
import { assembleTypesenseServerConfig } from "~/lib/utils";
import { useEffect, useState } from "react";
import {
  InstantSearch,
  // SearchBox,
  Highlight,
  Pagination,
  Configure,
  Hits,
  HitsPerPage,
} from "react-instantsearch-hooks-web";
import { TagNotesResults } from "./tagNotesResults";
import { Paginator } from "../ui/paginator";
import { SearchBox } from "../ui/searchBox";

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
          sort_by: "createdAt:asc",
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
            <div className="flex items-center justify-between">
              <div className="w-64">
                <SearchBox />
              </div>
              <Paginator />
            </div>
            <TagNotesResults />
            <div className="flex justify-center">
              <Paginator />
            </div>
          </InstantSearch>
        </div>
      )}
    </div>
  );
};
