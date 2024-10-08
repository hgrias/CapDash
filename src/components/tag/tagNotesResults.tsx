import { useOrganizationContext } from "../organizationContext";
import { useHits, Highlight } from "react-instantsearch-hooks-web";
import { badgeVariants } from "~/components/ui/badge";
import { Separator } from "../ui/separator";
import Link from "next/link";

type HitType = {
  id: string;
  createdById: string;
  createdByName: string;
  legislatorId: string;
  legislatorName: string;
  createdAt: string;
  content: string;
};

export const TagNotesResults = () => {
  const { organization } = useOrganizationContext();
  const { hits } = useHits();

  const resultsList = hits.map((hit: HitType) => {
    // Convert unix timestamp to human readable format
    const unixTs = parseInt(hit.createdAt, 10) * 1000; // Convert to milliseconds
    const date = new Date(unixTs);
    const humanReadableDate = date.toLocaleString();

    return (
      <div
        key={hit.id}
        className="flex flex-col gap-y-1 rounded-md border p-3 hover:bg-gray-50"
      >
        <h1 className="text-justify">
          <Highlight attribute="content" hit={hit} />
        </h1>
        <div className="mt-1 flex items-center gap-x-4">
          <p className="text-sm font-medium text-gray-500">
            {humanReadableDate}
          </p>
          <Separator orientation="vertical" className="h-4" />
          <p className="text-sm font-medium text-gray-500">
            Created by <Highlight attribute="createdByName" hit={hit} />
          </p>
          {hit.legislatorId && (
            <div className="flex items-center gap-x-4">
              <Separator orientation="vertical" className="h-4" />
              <Link
                href={`/org/${organization!.slug}/legislators/${
                  hit.legislatorId
                }`}
                className={`${badgeVariants({
                  variant: "outline",
                })} bg-blue-50 hover:underline`}
              >
                <h1>
                  <Highlight attribute="legislatorName" hit={hit} />
                </h1>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div>
      {resultsList.length ? (
        <div className="my-2 flex flex-col gap-y-3">{resultsList}</div>
      ) : (
        <div className="p-4 text-center">
          No notes have been created for this tag yet!
        </div>
      )}
    </div>
  );
};
