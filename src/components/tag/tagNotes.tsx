import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import { useOrganizationContext } from "../organizationContext";
import { assembleTypesenseServerConfig } from "~/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import {
  InstantSearch,
  SearchBox,
  Highlight,
  Configure,
  Hits,
} from "react-instantsearch-hooks-web";

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
          include_fields: "content, createdAt, legislatorId",
        },
      });
      setTypesenseSearchAdapter(searchAdapter);
    }
  }, [scopedSearchApiKey]);

  return (
    <div className="flex h-full p-4">
      {typesenseSearchAdapter && (
        <div className="w-full">
          <InstantSearch
            indexName="Note"
            searchClient={typesenseSearchAdapter.searchClient}
          >
            <Configure hitsPerPage={10} filters={[`tags: [${tagId}]`]} />
            <SearchBox />
            <ScrollArea>
              <Hits />
            </ScrollArea>
          </InstantSearch>
        </div>
      )}
    </div>
  );
};
