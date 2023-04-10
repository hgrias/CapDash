import { format, formatDistanceToNowStrict } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
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

interface NoteProps {
  noteId: number;
  content: string;
  creatorId: string;
  creatorName: string;
  createdAt: Date;
  creatorImage?: string | null;
}

const Note = ({
  noteId,
  content,
  creatorId,
  creatorName,
  createdAt,
  creatorImage,
}: NoteProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const utils = api.useContext();
  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => {
      // Refresh the notes on profile page
      utils.note.listForLegislator.invalidate();
    },
    onError: (error) => {
      console.error("Error deleting note:", error);
    },
  });

  // Get current user ID from session
  const session = useSession();
  const currentUserId = session.data!.user.id;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteNote = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      deleteNote.mutate({ noteId: noteId });
    }
  };

  return (
    <div
      className={`relative flex p-4 transition-colors hover:bg-gray-100 ${
        isHovered && "bg-gray-100"
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
        <div className="flex pt-1">
          <p className="text-sm font-medium text-gray-400">
            {formatNoteCreatedDate(createdAt)}
          </p>
        </div>
      </div>
      {creatorId === currentUserId && isHovered && (
        <div className="absolute top-4 right-4 flex transition duration-300 ease-in-out">
          <button
            onClick={handleDeleteNote}
            className="btn-outline btn-square btn-xs btn border-red-600 text-sm text-red-600 hover:border-red-600 hover:bg-red-600"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Note;
