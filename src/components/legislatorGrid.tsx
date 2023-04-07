import Bio from "./legislator/bio";
import { api } from "~/utils/api";
import Link from "next/link";

export const LegislatorGrid = () => {
  const { data: legislators } = api.legislator.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const legislatorCards = legislators?.map(
    (legislator: { id: string; firstName: string; lastName: string }) => (
      <div key={legislator.id}>
        <Link href={`/legislators/profile/${legislator.id}`}>
          <Bio
            firstName={legislator.firstName}
            lastName={legislator.lastName}
          />
        </Link>
      </div>
    )
  );

  return (
    <div className="m-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
      {legislatorCards}
    </div>
  );
};
