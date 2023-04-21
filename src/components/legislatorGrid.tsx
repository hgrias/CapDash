import Bio from "./legislator/bio";
import { api } from "~/utils/api";
import Link from "next/link";
import { useRouter } from "next/router";

export const LegislatorGrid = () => {
  const router = useRouter();
  const orgSlug = router.query["org-slug"] as string;

  const { data: legislators } = api.legislator.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const legislatorCards = legislators?.map(
    (legislator: { id: string; firstName: string; lastName: string }) => (
      <div key={legislator.id}>
        <Link href={`/org/${orgSlug}/legislators/${legislator.id}`}>
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
