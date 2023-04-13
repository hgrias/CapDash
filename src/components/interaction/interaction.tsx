import { Tag } from "@prisma/client";
import { format } from "date-fns";
import React from "react";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// TODO: Will eventually want to format them as link objects when the tag/project pages get implemented
function formatTags(tags: Tag[]) {
  return tags.map((tag) => tag.name).join(", ");
}

interface InteractionProps {
  createdAt: Date;
  creatorName: string;
  method: string;
  content?: string;
  noteId?: number;
  tags?: Tag[];
}

export const Interaction = ({
  createdAt,
  creatorName,
  method,
  content,
  noteId,
  tags,
}: InteractionProps) => {
  const formattedDate = format(createdAt, "MMMM dd, yyyy");

  return (
    <li className="mb-5 ml-4">
      <div className="absolute -left-1 h-2 w-2 rounded-full bg-gray-300 outline outline-4 outline-white" />
      <time className="mb-1 text-sm font-normal leading-none text-gray-400">
        {formattedDate} via {creatorName}
      </time>
      <h3 className="text-lg font-semibold text-gray-900">
        {capitalizeFirstLetter(method)} Interaction
      </h3>
      <p className="mb-1 text-base font-normal text-gray-500">
        {content ?? null}
      </p>
      <div className="flex">
        {tags?.length ? (
          <div className="flex">
            <p className="text-base font-medium text-gray-900">{`Tags: ${formatTags(
              tags
            )}`}</p>
          </div>
        ) : null}
        {/* TODO: Figure out how to move to note when clicked */}
        {noteId ? (
          <a href="/" className="ml-6 text-blue-700">
            View Notes
          </a>
        ) : null}
      </div>
    </li>
  );
};
