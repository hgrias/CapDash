import LegislatorContext from "./legislator/legislatorContext";
import Bio from "./legislator/bio";
import { api } from "~/utils/api";
import Link from "next/link";

export const LegislatorGrid = () => {
  const { data: legislators } = api.legislator.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const legislatorCards = legislators?.map((legislator) => (
    <div key={legislator.id}>
      <LegislatorContext.Provider value={legislator}>
        <Link href={`/legislators/profile/${legislator.id}`}>
          <Bio />
        </Link>
      </LegislatorContext.Provider>
    </div>
  ));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {legislatorCards}
    </div>
  );
};
