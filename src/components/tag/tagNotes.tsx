import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { useOrganizationContext } from "../organizationContext";
import { assembleTypesenseServerConfig } from "~/lib/utils";
import { useEffect, useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Highlight,
  Configure,
  Hits,
  HitsPerPage,
} from "react-instantsearch-hooks-web";
import { TagNotesResults } from "./tagNotesResults";

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
          query_by: "content, createdAt",
          query_by_weights: "4, 1",
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
            <Configure hitsPerPage={10} filters={[`tags: [${tagId}]`]} />
            <SearchBox />
            <TagNotesResults />
          </InstantSearch>
        </div>
      )}
    </div>
  );
};
