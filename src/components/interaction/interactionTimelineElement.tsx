import { Interaction } from "@prisma/client";
import React, { FC } from "react";

interface TimelineElementProps {
  interaction: Interaction;
}

const TimelineElement: FC<TimelineElementProps> = ({ interaction }) => {
  return (
    <>
      <li className="mb-10 ml-6">
        <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
          <svg
            aria-hidden="true"
            className="h-3 w-3 text-blue-800 dark:text-blue-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
          {interaction.type} Interaction - Created By: {interaction.user.name}
        </h3>
        <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          {interaction.createdAt.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          {interaction.content}
        </p>
      </li>
    </>
  );
};

export default TimelineElement;
