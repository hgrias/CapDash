import LegislatorContext from "~/components/legislator/legislatorContext";
import LegislatorInfo from "~/components/legislator/legislatorInfo";
import ProfileHeader from "~/components/legislator/profileHeader";
import { Header } from "~/components/header";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";

const LegislatorProfile: NextPage = () => {
  const legislatorId = useRouter().query.id as string;

  const { data: legislator } = api.legislator.getById.useQuery(
    {
      legislatorId,
    },
    { refetchOnWindowFocus: false }
  );

  // Get all interactions associated with the legislator
  const { data: interactions = [], refetch: refetchInteractions } =
    api.interaction.getAllForLegislator.useQuery(
      {
        legislatorId,
      },
      { refetchOnWindowFocus: false }
    );

  // TODO: Determine what to do if we don't get any information back from API
  if (!legislator) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="bg-slate-100">
        <LegislatorContext.Provider value={legislator}>
          <div className="flex py-2">
            <div className="flex w-full ">
              <ProfileHeader />
            </div>
          </div>
          <div className="mx-4 grid gap-4 sm:grid-cols-3">
            <div className="col-span-3 sm:col-span-2">
              <div className="mb-4">
                <LegislatorInfo />
              </div>
              <div className="col-span-3 h-36 bg-gray-300 text-center sm:col-span-2">
                Notes
              </div>
            </div>
            <div className="col-span-3 bg-gray-300 text-center sm:col-span-1">
              Interactions
            </div>
          </div>
        </LegislatorContext.Provider>
      </div>
    </>
  );
};

export default LegislatorProfile;
