import React, { FC, useState, useContext } from "react";
import NewInteractionForm from "./newInteractionForm";
import LegislatorContext from "../legislator/legislatorContext";
import InteractionTimeline from "./interactionTimeline";
import { Legislator } from "@prisma/client";
import { useRouter } from "next/router";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

type RouterOutput = inferRouterOutputs<AppRouter>;
type interactionsSchema = RouterOutput["interaction"]["getAllForLegislator"];

interface ProfileInteractionProps {
  interactions: interactionsSchema | [];
  refetchInteractionsHandler: () => void;
}

const ProfileInteractions: FC<ProfileInteractionProps> = ({
  interactions,
  refetchInteractionsHandler,
}) => {
  const [showNewInteractionForm, setShowNewInteractionForm] = useState(false);

  const legislator = useContext(LegislatorContext) as Legislator;

  function handleNewInteractionClick() {
    setShowNewInteractionForm(true);
  }

  return (
    <div className="card text-neutral-content">
      <div className="card-actions card">
        {showNewInteractionForm ? (
          <div className="card w-full bg-neutral text-neutral-content">
            <div className="card-body">
              <h2 className="card-title">Create New Interaction</h2>
              <NewInteractionForm
                legislator={legislator}
                refetchInteractionsHandler={refetchInteractionsHandler}
                setShowNewInteractionForm={setShowNewInteractionForm}
              />
            </div>
          </div>
        ) : (
          <button className="btn" onClick={handleNewInteractionClick}>
            Create New Interaction
          </button>
        )}
      </div>
      <div className="card-body">
        {interactions ? (
          <InteractionTimeline interactionTimelineData={interactions} />
        ) : (
          <p>No interactions for this legislator</p>
        )}
      </div>
    </div>
  );
};

export default ProfileInteractions;
