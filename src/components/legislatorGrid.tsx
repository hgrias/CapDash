import { LegislatorCard } from "./legislator/legislatorCard";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Link from "next/link";

export const LegislatorGrid = () => {
  const router = useRouter();
  const orgSlug = router.query["org-slug"] as string;

  const { data: legislators } = api.legislator.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const legislatorCards = legislators?.map(
    (legislator: {
      id: string;
      firstName: string;
      lastName: string;
      role: string;
      district: string;
      party: string;
    }) => (
      <div key={legislator.id}>
        <Link href={`/org/${orgSlug}/legislators/${legislator.id}`}>
          <LegislatorCard
            firstName={legislator.firstName}
            lastName={legislator.lastName}
            role={legislator.role}
            district={legislator.district}
            party={legislator.party}
          />
        </Link>
      </div>
    )
  );

  return (
    <div className="m-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {legislatorCards}
    </div>
  );
};
