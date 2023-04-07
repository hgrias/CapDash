import { Staffer } from "@prisma/client";
import React from "react";

interface StafferInformationProps {
  staffers: Staffer[];
}

const StafferInformation = ({ staffers }: StafferInformationProps) => {
  if (!staffers) {
    return null;
  }

  // Make elements for all staffers - Sorting to get Chief of Staff first
  const stafferElements = staffers.map((staffer: Staffer) => {
    return (
      <div key={staffer.id} className="flex flex-col">
        <h3 className="text-md font-semibold text-gray-600">
          {staffer.position}
        </h3>
        <ul>
          <li>{staffer.name}</li>
          <li>{staffer.phone}</li>
          <li>{staffer.email}</li>
        </ul>
      </div>
    );
  });

  return (
    <div className="w-full rounded-lg bg-white shadow-lg">
      {stafferElements ? (
        <div
          id="staffer-grid"
          className="grid grid-cols-1 gap-y-4 gap-x-2 px-4 py-2 sm:grid-cols-2"
        >
          {stafferElements}
        </div>
      ) : null}
    </div>
  );
};

export default StafferInformation;
