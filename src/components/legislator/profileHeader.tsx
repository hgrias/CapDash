import LegislatorContext from "./legislatorContext";
import React, { useContext } from "react";
import Avatar from "./avatar";

const ProfileHeader = () => {
  const { firstName, lastName, state, chamber, party } =
    useContext(LegislatorContext);
  return (
    <div className="flex p-4">
      <Avatar />
      <div className="ml-6 flex flex-col justify-center">
        <h1 className="text-2xl font-bold">
          {firstName} {lastName}
        </h1>
        <p className="">
          {state} - {party} - {chamber}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
