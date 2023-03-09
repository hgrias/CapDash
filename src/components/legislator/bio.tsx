import React, { FC, useContext } from "react";
import LegislatorContext from "./legislatorContext";
import Avatar from "./avatar";

interface BioProps {
  firstName: string;
  lastName: string;
  district: number;
  party: string;
  chamber: string;
}

// TODO: Do I still need BioProps if we are getting data directly from context?
const Bio: FC = () => {
  const { firstName, lastName, district, party, chamber } =
    useContext(LegislatorContext);

  return (
    <>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <Avatar />
          <h1 className="card-title">
            {firstName} {lastName}
          </h1>
          <h2>
            {party} - {chamber} - District {district}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Bio;
