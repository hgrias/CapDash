import React, { useContext } from "react";
import LegislatorContext from "./legislatorContext";

const LegislatorInfo = () => {
  const legislator = useContext(LegislatorContext);
  return (
    <div className="rounded-lg bg-white shadow-lg">
      <div id="title" className="border-b border-gray-300 px-4 py-2">
        <h2 className="text-lg font-semibold text-gray-600">
          Legislator Information
        </h2>
      </div>

      <div
        id="info-grid"
        className="grid grid-cols-1 gap-y-4 gap-x-2 px-4 py-2 sm:grid-cols-2"
      >
        <div id="email" className="flex flex-col">
          <h3 className="text-md font-medium text-gray-500">Email</h3>
          <p className="">Test Email</p>
        </div>

        <div id="phone" className="flex flex-col">
          <h3 className="text-md font-medium text-gray-500">Phone Number</h3>
          <p className="">734-123-4321</p>
        </div>

        <div id="staffer" className="flex flex-col">
          <h3 className="text-md font-medium text-gray-500">Staffer Contact</h3>
          <p className="">Test info</p>
        </div>

        <div id="relevant-links" className="flex flex-col">
          <h3 className="text-md font-medium text-gray-500">Relevant Links</h3>
          <p className="">Link 1</p>
          <p className="">Link 2</p>
        </div>
      </div>
    </div>
  );
};

export default LegislatorInfo;
