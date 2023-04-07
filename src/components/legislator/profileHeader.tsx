import { useProfileContext } from "../profileContext";
import Avatar from "../avatar";
import React from "react";
import {
  stateAbbreviationToName,
  partyAbbreviationToName,
  legislatorRoleToChamber,
} from "~/utils/componentUtils";

const ProfileHeader = () => {
  const { profile, isLoading, error } = useProfileContext();
  if (!profile) {
    return null;
  }

  // Get full state, party, and chamber
  const stateName = stateAbbreviationToName[profile.state];
  const partyName = partyAbbreviationToName[profile.party];
  const chamber = legislatorRoleToChamber[profile.role];

  return (
    <div className="flex p-4">
      <Avatar
        type="LEGISLATOR"
        name={profile.firstName + " " + profile.lastName}
        size={20}
      />
      <div className="ml-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold">
          {profile.role} {profile.firstName} {profile.lastName}
        </h1>
        <p className="">
          {stateName} - {partyName} - {chamber}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
