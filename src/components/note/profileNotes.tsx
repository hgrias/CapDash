import { useProfileContext } from "../profileContext";
import CreateNoteFooter from "./createNoteFooter";
import Note from "./note";
import React from "react";

const ProfileNotes = () => {
  const { notes, notesQuery, error } = useProfileContext();

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
              noteId={note.id}
              content={note.content}
              creatorName={note.user.name}
              creatorImage={note.user.image}
              createdAt={note.createdAt}
              creatorId={note.user.id}
            />
          );
        })
      ) : (
        <h2 className="p-4 font-normal">There are no notes! Create one!</h2>
      )}
      {notesQuery.hasNextPage || notesQuery.isFetchingNextPage ? (
        <div className="my-2 flex h-10 justify-center bg-slate-200 bg-gradient-to-t from-transparent to-white text-center">
          <button onClick={() => notesQuery.fetchNextPage()}>
            Load More Notes
          </button>
        </div>
      ) : null}
      <CreateNoteFooter />
    </div>
  );
};

export default ProfileNotes;
