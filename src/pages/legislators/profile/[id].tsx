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
import LegislatorInfo from "~/components/legislator/legislatorInfo";

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

        <div className="mx-4 grid gap-4 sm:grid-cols-3">
          <div className="col-span-3 sm:col-span-2">
            <div className="mb-4">
              <LegislatorInfo />
            </div>
            <div className="col-span-3 h-36 bg-gray-100 text-center sm:col-span-2">
              Notes
            </div>
          </div>
          <div className="col-span-3 bg-gray-200 text-center sm:col-span-1">
            Interactions
          </div>
        </div>
      </LegislatorContext.Provider>
    </>
  );
};

export default LegislatorProfile;
