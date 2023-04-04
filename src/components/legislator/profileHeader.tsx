import LegislatorContext from "./legislatorContext";
import React, { useContext } from "react";
import Avatar from "./avatar";
import {
  stateAbbreviationToName,
  partyAbbreviationToName,
  legislatorRoleToChamber,
} from "~/utils/componentUtils";

const ProfileHeader = () => {
  const { firstName, lastName, state, party, role } =
    useContext(LegislatorContext);

  // Get full state, party, and chamber
  const stateName = stateAbbreviationToName[state];
  const partyName = partyAbbreviationToName[party];
  const chamber = legislatorRoleToChamber[role];

  return (
    <div className="flex p-4">
      <Avatar />
      <div className="ml-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold">
          {role} {firstName} {lastName}
        </h1>
        <p className="">
          {stateName} - {partyName} - {chamber}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
