import React, { FC } from "react";

interface BioProps {
  firstName: string;
  lastName: string;
  district: number;
  party: string;
  chamber: string;
}

const Bio: FC<BioProps> = ({
  firstName,
  lastName,
  district,
  party,
  chamber,
}) => {
  return (
    <>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
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
