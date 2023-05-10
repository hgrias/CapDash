import { useOrganizationContext } from "../organizationContext";
import { format, formatDistanceToNowStrict } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { TagBadge } from "../tagBadge";
import { api } from "~/utils/api";
import Avatar from "../avatar";

export function formatNoteCreatedDate(dateTime: Date) {
  const daysAgo = formatDistanceToNowStrict(dateTime, {
    addSuffix: true,
  });
  const isMoreThanSevenDaysAgo =
    Math.abs(new Date().getTime() - dateTime.getTime()) > 604800000;

  if (isMoreThanSevenDaysAgo) {
    const formattedDate = format(dateTime, "MMMM dd, yyyy");

    return formattedDate;
  } else {
    return daysAgo; // "7 days ago"
  }
}

const confirmDeleteModal = (deleteHandler: () => void) => {
  return (
    <div>
      <input type="checkbox" id="confirmDeleteModal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="text-lg font-bold">
            Are you sure you want to delete this note?
          </h3>
          <div className="modal-action flex justify-center gap-5">
            <label
              htmlFor="confirmDeleteModal"
              className="btn-info btn text-white"
            >
              Cancel
            </label>
            <label
              htmlFor="confirmDeleteModal"
              className="btn-error btn text-white"
              onClick={deleteHandler}
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TagProps {
  id: number;
  name: string;
}

interface NoteProps {
  noteId: number;
  content: string;
  creatorId: string;
  creatorName: string;
  createdAt: Date;
  creatorImage?: string | null;
  tags: TagProps[] | [];
}

const Note = ({
  noteId,
  content,
  creatorId,
  creatorName,
  createdAt,
  creatorImage,
  tags,
}: NoteProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const utils = api.useContext();
  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      // Refresh the notes on profile page
      void utils.note.listForLegislator.invalidate();
      void utils.interaction.getForLegislator.invalidate();
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });

  // Get current user ID from session
  const session = useSession();
  // Get the org slug from context
  const { organization } = useOrganizationContext();

  if (!session.data || !organization) {
    return null;
  }

  const currentUserId = session.data.user.id;
  const orgSlug = organization.slug;

  const tagBadges = tags
    ? tags.map((tag) => <TagBadge key={tag.name} tag={tag} orgSlug={orgSlug} />)
    : null;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteNote = () => {
    deleteNote.mutate({ noteId: noteId });
  };

  return (
    <div
      className={`relative flex p-4 transition-colors hover:bg-gray-100 ${
        isHovered ? "bg-gray-100" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="hidden h-12 w-12 sm:block">
        <Avatar name={creatorName} type="USER" imageUri={creatorImage} />
      </div>
      <div className="flex flex-col sm:pl-4">
        <h3 className="font-semibold">{creatorName}</h3>
        <div className="my-1 font-normal">{content}</div>
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm font-medium text-gray-400">
            {formatNoteCreatedDate(createdAt)}
          </p>
          <div className="">{tagBadges}</div>
        </div>
      </div>
      {creatorId === currentUserId && isHovered && (
        <div className="absolute top-4 right-4 flex transition duration-300 ease-in-out">
          {confirmDeleteModal(handleDeleteNote)}
          <label
            htmlFor="confirmDeleteModal"
            className="btn-outline btn-square btn-xs btn border-red-600 text-sm text-red-600 hover:border-red-600 hover:bg-red-600"
          >
            X
          </label>
        </div>
      )}
    </div>
  );
};

export default Note;
