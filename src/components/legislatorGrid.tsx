import LegislatorContext from "./legislator/legislatorContext";
import { Legislator } from "@prisma/client";
import Bio from "./legislator/bio";
import { api } from "~/utils/api";
import Link from "next/link";

export const LegislatorGrid = () => {
  const { data: legislators } = api.legislator.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const legislatorCards = legislators?.map((legislator: Legislator) => (
    <div key={legislator.id}>
      <LegislatorContext.Provider value={legislator}>
        <Link href={`/legislators/profile/${legislator.id}`}>
          <Bio />
        </Link>
      </LegislatorContext.Provider>
    </div>
  ));

  return (
    <div className="m-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
      {legislatorCards}
    </div>
  );
};
