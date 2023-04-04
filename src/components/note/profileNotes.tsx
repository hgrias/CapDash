import { Note } from "@prisma/client";
import CreateNoteFooter from "./createNoteFooter";
import React from "react";

interface ProfileNotesProps {
  notes?: Note[];
}

const ProfileNotes = ({ notes }: ProfileNotesProps) => {
  return (
    <div id="profileNotes" className="w-full rounded-lg bg-white shadow-lg">
      <div id="header" className="border-b-1 border-b p-4 text-xl">
        <h1>Notes</h1>
      </div>

      {notes?.length ? (
        <p>Render the notes</p>
      ) : (
        <h2 className="p-4 font-normal">There are no notes! Create one!</h2>
      )}

      <CreateNoteFooter />
    </div>
  );
};

export default ProfileNotes;
