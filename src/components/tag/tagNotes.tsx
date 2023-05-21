import {
  InstantSearch,
  SearchBox,
  Highlight,
  Configure,
  Hits,
} from "react-instantsearch-hooks-web";

// TODO: Need to filter hits based on the selected tag name
export const TagNotes = () => {
  return (
    <div className="flex p-4">
      <Configure hitsPerPage={32} />
      <div className="w-full">
        <SearchBox />
        <Hits />
      </div>
    </div>
  );
};
