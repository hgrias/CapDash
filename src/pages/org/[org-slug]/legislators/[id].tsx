import { ProfileInteractions } from "~/components/interaction/profileInteractions";
import ProfileDetailsTabs from "~/components/legislator/profileDetailsTabs";
import ProfileHeader from "~/components/legislator/profileHeader";
import { ProfileProvider } from "~/components/profileContext";
import ProfileNotes from "~/components/note/profileNotes";
import { useSession } from "next-auth/react";
import { Header } from "~/components/header";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import Error from "next/error";

const LegislatorProfile: NextPage = () => {
  const { status } = useSession();
  const legislatorId = useRouter().query.id as string;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <Error statusCode={403} title="Access Denied" />;
  }

  if (!legislatorId) {
    return null;
  }

  return (
    <>
      <Header />
      <ProfileProvider legislatorId={legislatorId}>
        <div className="bg-slate-100 px-2 pb-36">
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
            <div className="col-span-3 sm:col-span-1">
              <ProfileInteractions />
            </div>
          </div>
        </div>
      </ProfileProvider>
    </>
  );
};

export default LegislatorProfile;
