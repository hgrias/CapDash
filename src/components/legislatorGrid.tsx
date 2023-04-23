import type { InfiniteHitsProps } from "react-instantsearch-hooks-web";
import { useInfiniteHits } from "react-instantsearch-hooks-web";
import { LegislatorCard } from "./legislator/legislatorCard";
import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const LegislatorGrid = () => {
  // Get hits from typesense
  const { hits, isLastPage, showMore } = useInfiniteHits();
  const router = useRouter();
  const orgSlug = router.query["org-slug"] as string;
  const sentinelRef = useRef(null);

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

  const renderedCards = hits.map((legislator) => {
    return (
      <div key={legislator.id as string}>
        <Link href={`/org/${orgSlug}/legislators/${legislator.id as string}`}>
          <LegislatorCard
            firstName={legislator.firstName as string}
            lastName={legislator.lastName as string}
            role={legislator.role as string}
            district={legislator.district as string}
            party={legislator.party as string}
          />
        </Link>
      </div>
    );
  });

  return (
    <div className="m-1 grid grid-cols-2 gap-4 sm:m-4 sm:grid-cols-4">
      {renderedCards}
      <div ref={sentinelRef} aria-hidden="true" />
    </div>
  );
};
