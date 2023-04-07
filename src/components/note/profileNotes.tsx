import { useProfileContext } from "../profileContext";
import CreateNoteFooter from "./createNoteFooter";
import Note from "./note";
import React from "react";

const ProfileNotes = () => {
  const { notes, isLoading, error } = useProfileContext();

  if (!notes) {
    return null;
  }

  return (
    <div id="profileNotes" className="w-full rounded-lg bg-white shadow-lg">
      <div id="header" className="border-b-1 border-b p-4 text-xl">
        <h1>Notes</h1>
      </div>

      {notes.length ? (
        notes.map((note) => {
          return (
            <Note
              key={note.id}
              content={note.content}
              creatorName={note.user.name}
              creatorImage={note.user.image}
              createdAt={note.createdAt}
            />
          );
        })
      ) : (
        <h2 className="p-4 font-normal">There are no notes! Create one!</h2>
      )}

      <CreateNoteFooter />
    </div>
  );
};

export default ProfileNotes;
