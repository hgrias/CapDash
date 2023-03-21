import React, { useContext } from "react";
import LegislatorContext from "./legislatorContext";
import Avatar from "./avatar";

interface IBioProps {
  firstName?: string;
  lastName?: string;
  party?: string;
  chamber?: string;
  district?: number;
}

const Bio = ({
  firstName: propsFirstName,
  lastName: propsLastName,
  party: propsParty,
  chamber: propsChamber,
  district: propsDistrict,
}: IBioProps) => {
  // Allow us to pass in props if needed, otherwise populate from context
  const {
    firstName = propsFirstName,
    lastName = propsLastName,
    district = propsDistrict,
    party = propsParty,
    chamber = propsChamber,
  } = useContext(LegislatorContext) || {};

  return (
    <>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <Avatar />
          <h1 className="card-title">
            {firstName} {lastName}
          </h1>
          <h2>{party}</h2>
          <h2>{chamber}</h2>
          <h2>District {district}</h2>
        </div>
      </div>
    </>
  );
};

export default Bio;
