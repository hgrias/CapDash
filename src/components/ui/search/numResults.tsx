import { usePagination } from "react-instantsearch-hooks-web";

export const NumResults = () => {
  const { nbHits } = usePagination();
  return (
    <p className="whitespace-nowrap font-medium">
      {nbHits} {nbHits === 1 ? "Result" : "Results"}
    </p>
  );
};
