import React from "react";
import { InteractionType, Legislator } from "@prisma/client";
import { api } from "~/utils/api";
import { Dispatch, SetStateAction } from "react";

// TODO: Should we just use Legislator context here instead of props?
interface NewInteractionFormProps {
  legislator: Legislator;
  onRefetchInteractions: () => void;
  setShowNewInteractionForm: Dispatch<SetStateAction<boolean>>;
}

const NewInteractionForm = ({
  legislator,
  onRefetchInteractions,
  setShowNewInteractionForm,
}: NewInteractionFormProps) => {
  const interactionTypeOptions = Object.keys(InteractionType).map(
    (interaction) => {
      return <option key={interaction}>{interaction}</option>;
    }
  );

  const createInteraction = api.interaction.create.useMutation({
    onSuccess: () => {
      void onRefetchInteractions();
      setShowNewInteractionForm(false);
    },
  });

  // TODO: Should probably abstract out the submitHandler
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(event.currentTarget);

    // Get the values of the form fields
    const interactionType = formData.get("interactionType") as InteractionType;
    const interactionContent = formData.get("interactionContent") as string;

    // TODO: Fix these validations: Make input box red and alert user
    // Perform any necessary validations on the form data
    if (!interactionType) {
      console.log("Please select an interaction type");
      return;
    }

    if (!interactionContent) {
      console.log("Please enter some content");
      return;
    }

    console.log(legislator.currentSessionId);

    // Hit the create interaction endpoint
    createInteraction.mutate({
      content: interactionContent,
      type: interactionType,
      legislatorId: legislator.id,
      sessionId: legislator.currentSessionId,
    });

    // Clear the form inputs after submission
    event.currentTarget.reset();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="">
          {/* //Content */}
          <div className="col-span-3">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              name="interactionContent"
              className="textarea-bordered textarea h-52 w-full"
              placeholder="Interaction Content"
            />
          </div>
          {/* Buttons */}
          <label className="label">
            <span className="label-text">Interaction Type</span>
          </label>
          <div className="flex justify-between">
            <select name="interactionType" className="select-bordered select">
              {interactionTypeOptions}
            </select>

            <div>
              <button
                className="btn-error btn mr-4"
                onClick={() => setShowNewInteractionForm(false)}
              >
                Cancel
              </button>
              <button className="btn-accent btn" type="submit">
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default NewInteractionForm;
