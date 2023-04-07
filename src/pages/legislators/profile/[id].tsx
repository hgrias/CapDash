import ProfileDetailsTabs from "~/components/legislator/profileDetailsTabs";
import ProfileHeader from "~/components/legislator/profileHeader";
import ProfileNotes from "~/components/note/profileNotes";
import { ProfileProvider } from "~/components/profileContext";
import { Header } from "~/components/header";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";

const LegislatorProfile: NextPage = () => {
  const legislatorId = useRouter().query.id as string;

  if (!legislatorId) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="bg-slate-100 px-2 pb-36">
        <ProfileProvider legislatorId={legislatorId}>
          <div className="flex py-2">
            <div className="flex w-full ">
              <ProfileHeader />
            </div>
          </div>
          <div className="grid gap-6 sm:mx-4 sm:grid-cols-3">
            <div className="col-span-3 sm:col-span-2">
              <div className="mb-6">
                <ProfileDetailsTabs />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <ProfileNotes />
              </div>
            </div>
            <div className="col-span-3 bg-gray-300 text-center sm:col-span-1">
              Interactions
            </div>
          </div>
        </ProfileProvider>
      </div>
    </>
  );
};

export default LegislatorProfile;
