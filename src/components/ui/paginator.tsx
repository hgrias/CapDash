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
    <ul className="flex items-center justify-between gap-x-1 rounded-md p-1 text-sm">
      {!isFirstPage && !pages.includes(0) && (
        <li className="flex h-6 w-6 items-center justify-center hover:underline">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              refine(0);
            }}
          >
            1
          </a>
        </li>
      )}
      {!isFirstPage && !pages.includes(1) && (
        <li className="flex h-4 w-4 items-center justify-center">
          <p className="p-1 text-lg font-semibold">...</p>
        </li>
      )}
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
              <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-slate-100 hover:underline">
                <strong>{page + 1}</strong>
              </div>
            ) : (
              <div className="flex h-6 w-6 items-center justify-center hover:underline">
                {page + 1}
              </div>
            )}
          </a>
        </li>
      ))}
      {!isLastPage && !pages.includes(nbPages - 2) && (
        <li className="flex h-4 w-4 items-center justify-center">
          <p className="p-1 text-lg font-semibold">...</p>
        </li>
      )}
      {!isLastPage && !pages.includes(nbPages - 1) && (
        <li className="flex h-6 w-6 items-center justify-center hover:underline">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              refine(nbPages - 1);
            }}
          >
            {nbPages}
          </a>
        </li>
      )}
    </ul>
  );
};
