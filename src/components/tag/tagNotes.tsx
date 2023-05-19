import {
  InstantSearch,
  SearchBox,
  Highlight,
  Configure,
  Hits,
} from "react-instantsearch-hooks-web";

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
