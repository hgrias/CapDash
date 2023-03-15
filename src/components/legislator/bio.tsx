import React, { FC, useContext } from "react";
import LegislatorContext from "./legislatorContext";
import Avatar from "./avatar";

const Bio: FC = () => {
  const { firstName, lastName, district, party, chamber } =
    useContext(LegislatorContext);

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
