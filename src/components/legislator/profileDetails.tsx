import React, { FC } from "react";
import Bio from "./bio";
import Avatar from "./avatar";
import LegislatorContext from "./legislatorContext";

const ProfileDetails: FC = () => {
  return (
    <>
      <Avatar />
      <Bio />
    </>
  );
};

export default ProfileDetails;
