import { format } from "date-fns";
import React from "react";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface InteractionProps {
  createdAt: Date;
  creatorName: string;
  type: string;
  method: string;
  noteId?: number;
  tags?: string[];
}

export const Interaction = ({
  createdAt,
  creatorName,
  type,
  method,
  noteId,
  tags,
}: InteractionProps) => {
  const formattedDate = format(createdAt, "MMMM dd, yyyy");

  return (
    <li className="mb-5 ml-4">
      <div className="absolute -left-1 h-2 w-2 rounded-full bg-gray-200 outline outline-4 outline-white"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400">
        {formattedDate}
      </time>
      <h3 className="text-lg font-semibold text-gray-900">
        {capitalizeFirstLetter(method)} Interaction with {creatorName}
        {tags?.length ? `on ${tags}` : null}
      </h3>
      <p className="mb-4 text-base font-normal text-gray-500">
        {noteId ? `view note here` : null}
      </p>
    </li>
  );
};
