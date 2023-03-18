import NewInteractionForm from "~/components/interaction/newInteractionForm";
import LegislatorContext from "~/components/legislator/legislatorContext";
import ProfileDetails from "~/components/legislator/profileDetails";
import InteractionTimeline from "~/components/interactionTimeline";
import { Header } from "~/components/header";
import { useRouter } from "next/router";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { useState } from "react";

const LegislatorProfile: NextPage = () => {
  const legislatorId = useRouter().query.id as string;
  const [showNewInteractionForm, setShowNewInteractionForm] = useState(false);

  function handleNewInteractionClick() {
    setShowNewInteractionForm(true);
  }

  // TODO: Determine if this API call is called on blur only on dev?
  const { data: legislator } = api.legislator.getById.useQuery({
    legislatorId,
  });

  // Get all interactions associated with the legislator
  const { data: interactions, refetch: refetchInteractions } =
    api.interaction.getAllForLegislator.useQuery({
      legislatorId,
    });

  // TODO: Determine what to do if we don't get any information back from API
  if (!legislator) {
    return null;
  }

  // TODO: Determine what to do if we dont have any interactions
  if (!interactions) {
    return null;
  }

  return (
    <>
      <Header />
      <LegislatorContext.Provider value={legislator}>
        <div className="mb-4 flex">
          <div className="h-12 w-1/4 px-5 pt-5">
            <ProfileDetails />
          </div>
          <div className="mx-10 h-12 w-3/4 justify-center px-2 pt-5">
            {showNewInteractionForm ? (
              <div className="card bg-neutral text-neutral-content ">
                <div className="card-body">
                  <h2 className="card-title">Create New Interaction</h2>
                  <NewInteractionForm
                    legislator={legislator}
                    refetchInteractions={refetchInteractions}
                    setShowNewInteractionForm={setShowNewInteractionForm}
                  />
                </div>
              </div>
            ) : (
              <button className="btn" onClick={handleNewInteractionClick}>
                Create New Interaction
              </button>
            )}
            <InteractionTimeline interactionTimelineData={interactions} />
          </div>
        </div>
      </LegislatorContext.Provider>
    </>
  );
};

export default LegislatorProfile;
