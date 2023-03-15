import React, { FC } from "react";
import { InteractionType } from "@prisma/client";

interface NewInteractionFormProps {}

const NewInteractionForm: FC<NewInteractionFormProps> = () => {
  const interactionTypeOptions = Object.keys(InteractionType).map(
    (interaction) => {
      return <option key={interaction}>{interaction}</option>;
    }
  );

  return (
    <>
      <div className="form form-control grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            name="interactionContent"
            className="textarea-bordered textarea h-52 w-full"
            placeholder="Interaction Content"
          />
        </div>
        <div className="">
          <label className="label">
            <span className="label-text">Interaction Type</span>
          </label>
          <select name="interactionType" className="select-bordered select">
            {interactionTypeOptions}
          </select>
        </div>
        <div className="relative">
          <button
            className="btn-secondary btn absolute bottom-0 right-0"
            type="submit"
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default NewInteractionForm;
