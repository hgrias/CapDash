import {
  usePagination,
  type UsePaginationProps,
} from "react-instantsearch-hooks-web";

export const Paginator = (props: UsePaginationProps) => {
  const {
    pages,
    currentRefinement,
    nbHits,
    nbPages,
    isFirstPage,
    isLastPage,
    canRefine,
    refine,
    createURL,
  } = usePagination(props);

  return (
    <ul className="flex items-center justify-between gap-x-2 rounded-md p-1 text-sm">
      {pages.map((page) => (
        <li key={page}>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              refine(page);
            }}
          >
            {page === currentRefinement ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-slate-100">
                <strong>{page + 1}</strong>
              </div>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center">
                {page + 1}
              </div>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
};
