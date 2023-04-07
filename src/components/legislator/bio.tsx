import React from "react";
import Avatar from "../avatar";

interface BioProps {
  firstName: string;
  lastName: string;
}

const Bio = ({ firstName, lastName }: BioProps) => {
  return (
    <>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <Avatar
            type="LEGISLATOR"
            name={firstName + " " + lastName}
            size={20}
          />
          <h1 className="card-title">
            {firstName} {lastName}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Bio;
