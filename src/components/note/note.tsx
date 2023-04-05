import { format, formatDistanceToNowStrict } from "date-fns";
import Avatar from "../avatar";
import React from "react";

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
  content: string;
  creatorName: string;
  createdAt: Date;
  creatorImage?: string | null;
}

const Note = ({ content, creatorName, createdAt, creatorImage }: NoteProps) => {
  // Convert created at date to human readable format

  return (
    <div className="m-4 flex">
      <div className="hidden h-12 w-12 sm:block">
        <Avatar name={creatorName} type="USER" imageUri={creatorImage} />
      </div>
      <div className="flex flex-col sm:pl-4">
        <h3 className="font-semibold">{creatorName}</h3>
        <div className="font-normal">{content}</div>
        <div className="flex pt-2">
          <p className="text-sm font-medium text-gray-400">
            {formatNoteCreatedDate(createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Note;
