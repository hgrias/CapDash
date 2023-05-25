import { usePagination } from "react-instantsearch-hooks-web";

export const NumResults = () => {
  const { nbHits } = usePagination();
  return (
    <div className="">
      <p className="whitespace-nowrap font-medium">{nbHits} results</p>
    </div>
  );
};
