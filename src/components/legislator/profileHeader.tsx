import { useProfileContext } from "../profileContext";
import Avatar from "../avatar";
import React from "react";
import {
  stateAbbreviationToName,
  partyAbbreviationToName,
  legislatorRoleToChamber,
} from "~/utils/componentUtils";

const ProfileHeader = () => {
  const { legislator, error } = useProfileContext();
  if (!legislator) {
    return null;
  }

  // Get full state, party, and chamber
  const stateName = stateAbbreviationToName[legislator.state];
  const partyName = partyAbbreviationToName[legislator.party];
  const chamber = legislatorRoleToChamber[legislator.role];

  return (
    <div className="flex p-4">
      <Avatar
        type="LEGISLATOR"
        name={legislator.firstName + " " + legislator.lastName}
        size={20}
      />
      <div className="ml-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold">
          {legislator.role} {legislator.firstName} {legislator.lastName}
        </h1>
        <p className="">
          {stateName} - {partyName} - {chamber}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
