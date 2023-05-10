import { useOrganizationContext } from "../organizationContext";
import type { Tag } from "@prisma/client";
import { TagBadge } from "../tagBadge";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
  const { organization } = useOrganizationContext();

  if (!organization) {
    return null;
  }

  const orgSlug = organization.slug;

  const tagBadges = tags
    ? tags.map((tag) => <TagBadge key={tag.name} tag={tag} orgSlug={orgSlug} />)
    : null;

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
          <div className="flex flex-wrap space-x-1">{tagBadges}</div>
        ) : null}
        {/* TODO: Figure out how to move to note when clicked */}
        {noteId ? <Link href="/" /> : null}
      </div>
    </li>
  );
};
