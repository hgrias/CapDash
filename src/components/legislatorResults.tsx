import { LegislatorListItem } from "./legislator/legislatorListItem";
import { useInfiniteHits } from "react-instantsearch-hooks-web";
import { LegislatorCard } from "./legislator/legislatorCard";
import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface LegislatorExploreResultsProps {
  view?: "grid" | "list";
}

export const LegislatorResults = ({
  view = "list",
}: LegislatorExploreResultsProps) => {
  // Get hits from typesense
  const { hits, isLastPage, showMore } = useInfiniteHits();
  const router = useRouter();
  const orgSlug = router.query["org-slug"] as string;
  const sentinelRef = useRef(null);
  const [selectedView, setSelectedView] = useState<typeof view>(view);

  // Listen for changes on view select
  useEffect(() => {
    setSelectedView(view);
  }, [view]);

  // Infinite Load Legislator Cards
  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLastPage) {
            showMore();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [isLastPage, showMore]);

  if (!hits) {
    console.error(
      "No legislators found in search index for org with slug: ",
      orgSlug
    );
    return null;
  }

  const legislatorResults = hits.map((legislator) => {
    return (
      <div key={legislator.id as string}>
        <Link href={`/org/${orgSlug}/legislators/${legislator.id as string}`}>
          {selectedView === "grid" ? (
            <LegislatorCard
              firstName={legislator.firstName as string}
              lastName={legislator.lastName as string}
              role={legislator.role as string}
              district={legislator.district as string}
              party={legislator.party as string}
            />
          ) : (
            <LegislatorListItem
              firstName={legislator.firstName as string}
              lastName={legislator.lastName as string}
              role={legislator.role as string}
              district={legislator.district as string}
              party={legislator.party as string}
            />
          )}
        </Link>
      </div>
    );
  });

  // Render as either a grid or list
  const renderStyle =
    selectedView === "grid"
      ? "m-1 grid grid-cols-2 gap-2 sm:m-4 sm:grid-cols-4"
      : "m-1 grid grid-cols-1 gap-y-1 sm:m-4";

  return (
    <div className={renderStyle}>
      {legislatorResults}
      <div ref={sentinelRef} aria-hidden="true" />
    </div>
  );
};
