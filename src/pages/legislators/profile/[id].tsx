import NewInteractionForm from "~/components/interaction/newInteractionForm";
import LegislatorContext from "~/components/legislator/legislatorContext";
import ProfileDetails from "~/components/legislator/profileDetails";
import InteractionTimeline from "~/components/interaction/interactionTimeline";
import { Header } from "~/components/header";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useState } from "react";
import ProfileInteractions from "~/components/interaction/profileInteractions";
import ProfileHeader from "~/components/legislator/profileHeader";

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
      <LegislatorContext.Provider value={legislator}>
        <div className="m-4 flex">
          <div className="flex w-full ">
            <ProfileHeader />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="ml-4 mb-4 h-36 bg-gray-100 text-center">
              Legislator Information / Contact
            </div>
            <div className="ml-4 mb-4 h-36 bg-gray-100 text-center">Notes</div>
          </div>
          <div className="mr-4 mb-4 bg-gray-200 text-center">Interactions</div>
        </div>
      </LegislatorContext.Provider>
    </>
  );
};

export default LegislatorProfile;
