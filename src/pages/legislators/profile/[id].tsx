import ProfileDetailsTabs from "~/components/legislator/profileDetailsTabs";
import LegislatorContext from "~/components/legislator/legislatorContext";
import ProfileHeader from "~/components/legislator/profileHeader";
import ProfileNotes from "~/components/note/profileNotes";
import { Header } from "~/components/header";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";

const LegislatorProfile: NextPage = () => {
  const legislatorId = useRouter().query.id as string;

  // Get all relevant legislator data for profile
  const { data: legislator } = api.legislator.getProfileData.useQuery(
    {
      legislatorId: legislatorId,
    },
    { refetchOnWindowFocus: false }
  );

  // Extract legislator and staffer info to pass to relevant components
  const legislatorInfo = legislator?.LegislatorInfo[0];
  const staffers = legislator?.Staffers;

  // TODO: Determine what to do if we don't get any information back from API
  if (!legislator || !legislatorInfo) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="bg-slate-100 px-2 pb-36">
        <LegislatorContext.Provider value={legislator}>
          <div className="flex py-2">
            <div className="flex w-full ">
              <ProfileHeader />
            </div>
          </div>
          <div className="mx-4 grid gap-6 sm:grid-cols-3">
            <div className="col-span-3 sm:col-span-2">
              <div className="mb-6">
                <ProfileDetailsTabs
                  legislatorInfo={legislatorInfo}
                  staffers={staffers}
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <ProfileNotes />
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
