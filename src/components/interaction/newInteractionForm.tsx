import React, { FC, useContext } from "react";
import { InteractionType } from "@prisma/client";

interface NewInteractionFormProps {}

const NewInteractionForm: FC<NewInteractionFormProps> = () => {
  return (
    <>
      <div className="card bg-primary text-primary-content">
        <div className="card-body items-center text-center">
          <div className="card-title">Create New Interaction</div>
          <div className="card-content">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Interaction Type</span>
              </label>
              <select className="select-bordered select">
                {Object.keys(InteractionType).map((interaction) => {
                  return <option key={interaction}>{interaction}</option>;
                })}
              </select>
              <label className="label">
                <span className="label-text">What is your name?</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input-bordered input w-full max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewInteractionForm;
