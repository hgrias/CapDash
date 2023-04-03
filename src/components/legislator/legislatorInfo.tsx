import { LegislatorInfo, StafferContact } from "@prisma/client";
import React from "react";

interface LegislatorInfoProps {
  info: LegislatorInfo;
  staffers?: StafferContact[];
}

const LegislatorInfo = ({ info, staffers }: LegislatorInfoProps) => {
  // Make elements for all staffers
  const stafferElements = staffers?.map((staffer) => {
    return (
      <div key={staffer.id} className="flex flex-col">
        <p className="text font-">{staffer.name}</p>
        <p>{staffer.phone}</p>
        <p>{staffer.email}</p>
      </div>
    );
  });

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
          <a className="max-w-max" href={value?.toString()}>
            {linkTitle}
          </a>
        </li>
      );
    });

  return (
    <div className="rounded-lg bg-white shadow-lg">
      <div id="title" className="border-b border-gray-300 px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-700">
          Legislator Information
        </h2>
      </div>

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

        {stafferElements ? (
          <div id="staffer" className="flex flex-col">
            <h3 className="text-md font-semibold text-gray-600">
              Staffer Contact
            </h3>
            {stafferElements}
          </div>
        ) : null}

        <div id="location" className="flex flex-col">
          <h3 className="text-md font-semibold text-gray-600">Office Number</h3>
          <p className="">{info.capitolOfficeNumber}</p>
        </div>

        <div id="committees" className="flex flex-col">
          <h3 className="text-md font-semibold text-gray-600">Committees</h3>
          <p className="">Committee 1</p>
          <p className="">Committee 2</p>
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

export default LegislatorInfo;
