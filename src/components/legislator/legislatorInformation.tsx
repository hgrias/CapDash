import { LegislatorInfo, StafferInfo } from "@prisma/client";
import React from "react";

interface LegislatorInfoProps {
  info: LegislatorInfo;
}

const LegislatorInformation = ({ info }: LegislatorInfoProps) => {
  // Make elements for all relevant links
  const relevantLinks = Object.entries(info)
    .filter(([key, value]) => key.includes("Url") && value !== null)
    .map(([key, value]) => {
      let linkTitle = "";
      if (key.includes("chamber")) {
        linkTitle = "Chamber Website";
      } else if (key.includes("capitol")) {
        linkTitle = "Capitol Website";
      }
      return (
        <li key={key}>
          <a className="max-w-max text-blue-600" href={value?.toString()}>
            {linkTitle}
          </a>
        </li>
      );
    });

  return (
    <div className="w-full rounded-lg rounded-tl-none bg-white shadow-lg">
      <div
        id="info-grid"
        className="grid grid-cols-1 gap-y-4 gap-x-2 px-4 py-2 sm:grid-cols-2"
      >
        <div id="email" className="flex flex-col">
          <h3 className="text-md font-semibold text-gray-600">Email</h3>
          <p className="">{info?.email}</p>
        </div>

        <div id="phone" className="flex flex-col">
          <h3 className="text-md font-semibold text-gray-600">Phone Number</h3>
          <p className="">{info?.phone}</p>
        </div>

        <div id="location" className="flex flex-col">
          <h3 className="text-md font-semibold text-gray-600">Office Number</h3>
          <p className="">{info.capitolOfficeNumber}</p>
        </div>

        {relevantLinks ? (
          <div id="relevant-links" className="flex flex-col">
            <h3 className="text-md font-semibold text-gray-600">
              Relevant Links
            </h3>
            <ul>{relevantLinks}</ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LegislatorInformation;
